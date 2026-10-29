import { cp, mkdir, rm, readFile, readdir, writeFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { publicFiles } from './public-files.mjs';
import { buildUi } from './build-ui.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const development = process.argv.includes('--dev');
const output = resolve(root, development ? '.dev' : 'dist');
// Ler fontes, nunca o bundle minificado; o HTML SSR inclui as classes da ilha.
const content = [resolve(output, 'index.html'), ...['js/main.js', 'js/motion.js', 'js/**/*.jsx'].map(name => resolve(root, name))].join(',');
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await buildUi(output);
for (const name of publicFiles) {
  if (['index.html', 'js/frontend.js', 'js/frontend.css', 'assets/ui-LICENSES.txt'].includes(name)) continue;
  const target = resolve(output, name);
  await mkdir(dirname(target), { recursive: true });
  if (name === 'css/styles.css') {
    // O limite generoso cobre volumes em iCloud/rede; em disco local o processo leva segundos.
    const result = spawnSync(process.execPath, [resolve(root, 'node_modules/tailwindcss/lib/cli.js'), '-c', resolve(root, 'tailwind.config.cjs'), '--content', content, '-i', resolve(root, 'css/input.css'), '-o', target, '--minify'], { cwd: root, stdio: 'inherit', timeout: 600000 });
    if (result.status !== 0) throw new Error(`Tailwind CSS falhou: ${result.error?.code || result.status}. Compilação interrompida; saída não aprovada.`);
  } else {
    // Apenas entradas enumeradas, nunca uma cópia recursiva da raiz.
    await cp(resolve(root, name), target);
  }
}
const html = await readFile(resolve(output, 'index.html'), 'utf8');
if (/cdn\.tailwindcss|fonts\.googleapis/.test(html)) throw new Error('Dependência CSS externa não permitida.');
// O Finder/iCloud cria metadados em diretórios novos; eles não fazem parte do artefato.
const stripMetadata = async (dir) => {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const target = resolve(dir, entry.name);
    if (entry.isDirectory()) await stripMetadata(target);
    else if (entry.name === '.DS_Store' || entry.name.startsWith('._')) await rm(target, { force: true });
  }
};
await stripMetadata(output);
// Normalizar quebra final sem timestamps torna a saída repetível.
await writeFile(resolve(output, 'index.html'), html.trimEnd() + '\n');
console.log(`${development ? 'Compilação local' : 'Build'}: ${publicFiles.length} arquivos públicos em ${output}`);
