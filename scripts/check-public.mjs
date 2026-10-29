import { readFile } from 'node:fs/promises';
import { publicFiles } from './public-files.mjs';
const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
if ((html.match(/<h1[\s>]/g) || []).length !== 1) throw new Error('A página deve ter exatamente um h1.');
if (/cdn\.tailwindcss|fonts\.googleapis/.test(html)) throw new Error('CSS/fontes devem ser locais.');
for (const match of html.matchAll(/(?:src|href)="([^"#:]+)"/g)) {
  const url = match[1];
  if (!/^(https?:|mailto:|tel:)/.test(url) && !publicFiles.includes(url)) throw new Error(`Asset fora da allowlist: ${url}`);
}
if (publicFiles.some(name => name.startsWith('.') || name.includes('..') || /\.(md|json)$/.test(name))) throw new Error('Arquivo privado na allowlist.');
console.log('HTML e fronteira pública verificados.');
