import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { build } from 'esbuild';
import { createElement } from 'react';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import { ArrowUpRight, ArrowRight, ArrowDown, Menu, Plus, LoaderCircle, MessageCircle, Drill, Layers3, FlaskConical, Waves, ShieldCheck, Compass, MapPin, FileCheck2 } from 'lucide-react';

const root = fileURLToPath(new URL('../', import.meta.url));
const heroStart = '<!-- hero:react:start -->';
const heroEnd = '<!-- hero:react:end -->';
// Símbolos técnicos fornecidos pelo usuário, inseridos inline sem pedidos de rede.
const serviceIcons = Object.fromEntries(await Promise.all(
  ['spt', 'rotativa', 'resistividade', 'dcp', 'dpl'].map(async name => [
    name, (await readFile(resolve(root, `assets/icons/soil/${name}.svg`), 'utf8')).trim(),
  ]),
));
const icons = {
  'arrow-up-right': ArrowUpRight,
  'arrow-right': ArrowRight,
  'arrow-down': ArrowDown,
  menu: Menu,
  plus: Plus,
  'loader-circle': LoaderCircle,
  'message-circle': MessageCircle,
  drill: Drill,
  'layers-3': Layers3,
  'flask-conical': FlaskConical,
  waves: Waves,
  'shield-check': ShieldCheck,
  compass: Compass,
  'map-pin': MapPin,
  'file-check-2': FileCheck2,
};

function renderIcons(html) {
  // Só SVGs marcados são substituídos; spans e conteúdo editorial ficam intactos.
  return html.replace(/<svg\b((?:[^"'>]|"[^"]*"|'[^']*')*)>[\s\S]*?<\/svg\s*>/gi, (svg, attributes) => {
    const attrs = new Map([...attributes.matchAll(/([^\s=]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s]+)))?/g)]
      .map((match) => [match[1].toLowerCase(), match[2] ?? match[3] ?? match[4] ?? '']));
    const service = attrs.get('data-service-icon');
    if (service) {
      if (!Object.hasOwn(serviceIcons, service)) throw new Error(`Símbolo técnico desconhecido: ${service}`);
      return serviceIcons[service];
    }
    const legacy = [
      ['M5 19 19 5', 'arrow-up-right'], ['M5 12h14m', 'arrow-right'],
      ['M12 4v16', 'arrow-down'], ['M3 7h18', 'menu'],
      ['M5 12h14M12 5', 'plus'], ['M20 12a8', 'loader-circle'],
      ['M20 11.5', 'message-circle'],
    ];
    const name = attrs.get('data-icon') || legacy.find(([path]) => svg.includes(path))?.[1];
    if (!name) return svg;
    if (!Object.hasOwn(icons, name)) throw new Error(`Ícone Lucide desconhecido: ${name}`);
    return renderToStaticMarkup(createElement(icons[name], {
      className: 'icon',
      'aria-hidden': true,
      focusable: false,
      strokeWidth: 1.6,
      'data-icon': name,
      ...(attrs.has('data-submit-spinner') ? { 'data-submit-spinner': attrs.get('data-submit-spinner') } : {}),
      ...(attrs.has('hidden') ? { hidden: true } : {}),
    }));
  });
}

export async function buildUi(output) {
  output = resolve(root, output);
  const template = (await readFile(resolve(root, 'index.html'), 'utf8'))
    .replace(/<link\b[^>]*rel="preload"[^>]*as="image"[^>]*>/g, '');
  const start = template.indexOf(heroStart);
  const end = template.indexOf(heroEnd);
  if (start < 0 || end < start || template.indexOf(heroStart, start + heroStart.length) !== -1 || template.indexOf(heroEnd, end + heroEnd.length) !== -1) {
    throw new Error('index.html deve conter exatamente um par ordenado de marcadores hero:react:start/end.');
  }

  // O intermediário permanece privado e dentro do repo para resolver packages externos.
  const buildDir = resolve(root, '.impeccable/build');
  await mkdir(buildDir, { recursive: true });
  const temporary = await mkdtemp(resolve(buildDir, 'hero-'));
  let hero;
  try {
    const renderer = resolve(temporary, 'hero-render.mjs');
    await build({
      absWorkingDir: root,
      entryPoints: ['js/ui/Hero.jsx'],
      outfile: renderer,
      bundle: true,
      platform: 'node',
      format: 'esm',
      packages: 'external',
      jsx: 'automatic',
      define: { 'process.env.NODE_ENV': '"production"' },
      legalComments: 'none',
    });
    const { default: Hero } = await import(pathToFileURL(renderer).href);
    hero = renderToString(createElement(Hero));
  } finally {
    await rm(temporary, { recursive: true, force: true });
  }

  await mkdir(resolve(output, 'js'), { recursive: true });
  await build({
    absWorkingDir: root,
    entryPoints: ['js/frontend-entry.jsx'],
    outfile: resolve(output, 'js/frontend.js'),
    bundle: true,
    platform: 'browser',
    format: 'esm',
    jsx: 'automatic',
    minify: true,
    define: { 'process.env.NODE_ENV': '"production"' },
    legalComments: 'inline',
  });

  // Renderizar ícones fora da ilha evita modificar o markup que React irá hidratar.
  const before = renderIcons(template.slice(0, start));
  const after = renderIcons(template.slice(end + heroEnd.length));
  // React 19 pré-carrega a imagem. Recursos pertencem ao head; o DOM hidratado
  // permanece idêntico e não há um <link> de metadados perdido dentro da section.
  const preloads = [...hero.matchAll(/<link\b[^>]*\/>/g)].map(match => match[0]).join('');
  hero = hero.replace(/<link\b[^>]*\/>/g, '');
  const html = `${before.replace('</head>', `${preloads}</head>`)}${heroStart}\n<div id="hero-react">${hero}</div>\n${heroEnd}${after}`
    .replace(/\s*\/>/g, '>')
    .replace(/fetchPriority=/g, 'fetchpriority=')
    .replace(/ hidden=""/g, ' hidden');
  await writeFile(resolve(output, 'index.html'), html.trimEnd() + '\n');
  const licenses = await Promise.all([
    ['React', 'react/LICENSE'], ['React DOM', 'react-dom/LICENSE'],
    ['Framer Motion', 'framer-motion/LICENSE.md'], ['Lucide React', 'lucide-react/LICENSE'],
  ].map(async ([label, path]) => `${label}\n${'='.repeat(label.length)}\n${await readFile(resolve(root, 'node_modules', path), 'utf8')}`));
  await mkdir(resolve(output, 'assets'), { recursive: true });
  await writeFile(resolve(output, 'assets/ui-LICENSES.txt'), licenses.join('\n\n'));
}
