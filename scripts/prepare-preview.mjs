// Gera HTML hidratável, bundle UI e CSS/fontes para a prévia da raiz; não gera dist.
import { spawnSync } from 'node:child_process';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildUi } from './build-ui.mjs';
const root = fileURLToPath(new URL('../', import.meta.url));
const content = ['index.html', 'js/main.js', 'js/motion.js', 'js/**/*.jsx'].map(name => resolve(root, name)).join(',');
await buildUi(root);
const result = spawnSync(process.execPath, [resolve(root, 'node_modules/tailwindcss/lib/cli.js'), '-c', resolve(root, 'tailwind.config.cjs'), '--content', content, '-i', resolve(root, 'css/input.css'), '-o', resolve(root, 'css/styles.css'), '--minify'], { cwd: root, stdio: 'inherit', timeout: 600000 });
if (result.status !== 0) { console.error(`Tailwind CSS falhou: ${result.error?.code || result.status}.`); process.exit(result.status || 1); }
console.log('Prévia da raiz preparada: Hero SSR, bundle UI, CSS compilado e fontes locais da referência. dist não foi gerado.');
