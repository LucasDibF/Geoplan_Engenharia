import { readFileSync } from 'node:fs';
import { expect, it } from 'vitest';
const html = readFileSync('index.html', 'utf8');
const css = readFileSync('css/site.css', 'utf8');
const tokens = readFileSync('css/input.css', 'utf8');

it('não oculta conteúdo por regras globais de preparação de movimento', () => {
  expect(css).not.toMatch(/\.motion-armed[^}]*\{[^}]*\b(?:opacity:\s*0|visibility:\s*hidden)/);
  expect(html).not.toContain('src="js/motion.js"');
  expect(html).toContain('id="hero-react"');
  expect(html).not.toContain('opacity:0');
});

it('usa as famílias reais da referência, hospedadas localmente', () => {
  expect(tokens).toContain("font-family: 'DM Sans'");
  expect(tokens).toContain("font-family: 'Cormorant Garamond'");
  expect(tokens).not.toMatch(/font-family: (Archivo|'Bodoni Moda')/);
  expect(tokens).not.toMatch(/https?:/);
});
