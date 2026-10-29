import { readFile, writeFile, readdir } from 'node:fs/promises';
import { resolve, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const metrics = { statements: 80, functions: 80, lines: 80, branches: 75 };
const summary = JSON.parse(await readFile(resolve(root, 'coverage/coverage-summary.json'), 'utf8'));
const run = JSON.parse(await readFile(resolve(root, 'coverage/unit-results.json'), 'utf8'));
const unitFiles = (await readdir(resolve(root, 'tests/unit'))).filter(name => name.endsWith('.test.js'));
if (!run.success || run.numTotalTests <= 0 || run.numTotalTests !== run.numPassedTests || run.numPendingTests !== 0 || run.testResults.length !== unitFiles.length) throw new Error('Baseline exige rodada unitária completa, sem falhas ou testes pendentes.');
for (const file of unitFiles) if (!run.testResults.some(result => result.name === resolve(root, 'tests/unit', file))) throw new Error(`Arquivo de teste ausente da rodada: ${file}`);
const application = async (directory) => {
  const entries = await readdir(directory, { withFileTypes: true });
  return (await Promise.all(entries.map(entry => entry.isDirectory() ? application(resolve(directory, entry.name)) : /\.(js|jsx)$/.test(entry.name) && resolve(directory, entry.name) !== resolve(root, 'js/frontend.js') ? [resolve(directory, entry.name)] : []))).flat();
};
const files = await application(resolve(root, 'js'));
for (const file of files) if (!summary[file]) throw new Error(`JS da aplicação ausente da cobertura: ${relative(root, file)}`);
if (!files.length) throw new Error('Nenhum JS da aplicação encontrado.');
for (const [metric, minimum] of Object.entries(metrics)) {
  const actual = summary.total[metric];
  if (!actual || actual.total <= 0 || !Number.isFinite(actual.pct) || actual.pct < minimum) throw new Error(`Cobertura ${metric} inválida ou abaixo de ${minimum}%.`);
}
const path = resolve(root, 'tests/coverage-baseline.json');
let baseline;
try { baseline = JSON.parse(await readFile(path, 'utf8')); }
catch (error) { if (error.code !== 'ENOENT') throw error; }
if (baseline) {
  for (const metric of Object.keys(metrics)) {
    if (!Number.isFinite(baseline.metrics[metric]?.pct)) throw new Error(`Baseline inválida: ${metric}.`);
    if (summary.total[metric].pct < baseline.metrics[metric].pct) throw new Error(`Regressão em ${metric}: ${summary.total[metric].pct}% < ${baseline.metrics[metric].pct}%.`);
  }
  console.log('Cobertura dentro dos limites, sem queda contra a baseline.');
} else {
  await writeFile(path, JSON.stringify({ schemaVersion: 1, source: 'vitest-v8-complete-run', files: files.map(file => relative(root, file)).sort(), metrics: summary.total }, null, 2) + '\n');
  console.log('Primeira baseline REAL criada em tests/coverage-baseline.json. Versione este arquivo após auditoria.');
}
