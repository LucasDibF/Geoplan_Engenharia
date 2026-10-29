import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { publicFiles } from './public-files.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const output = resolve(root, process.argv.includes('--dist') ? 'dist' : '.dev');
const port = Number(process.env.PORT || 4173);
const mime = { html: 'text/html; charset=utf-8', css: 'text/css; charset=utf-8', js: 'text/javascript; charset=utf-8', png: 'image/png', jpg: 'image/jpeg', svg: 'image/svg+xml', woff2: 'font/woff2', ttf: 'font/ttf', txt: 'text/plain; charset=utf-8' };
const server = createServer(async (request, response) => {
  let name;
  try { name = decodeURIComponent(new URL(request.url, 'http://localhost').pathname).slice(1) || 'index.html'; }
  catch { response.writeHead(400).end('Requisição inválida'); return; }
  if (!publicFiles.includes(name) || !['GET', 'HEAD'].includes(request.method)) { response.writeHead(404).end('Não encontrado'); return; }
  try {
    const content = await readFile(resolve(output, name));
    response.writeHead(200, { 'Content-Type': mime[name.split('.').pop()], 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' });
    response.end(request.method === 'HEAD' ? undefined : content);
  } catch { response.writeHead(404).end('Execute a compilação antes de iniciar o servidor.'); }
});
server.listen(port, '127.0.0.1', () => console.log(`Geoplan: http://127.0.0.1:${port} (${output})`));
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => server.close(() => process.exit(0)));
