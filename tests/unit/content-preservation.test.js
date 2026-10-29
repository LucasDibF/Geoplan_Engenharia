import { readFileSync } from 'node:fs';
import { expect, it } from 'vitest';

// A correção explicitamente pedida substitui o conteúdo antigo pelo arquivo fornecido.
const reference = readFileSync('tests/fixtures/approved-reference-page.tsx','utf8');
const page = new DOMParser().parseFromString(readFileSync('index.html','utf8'),'text/html');
it('usa os seis serviços e descrições literais da referência', () => {
  const expected = [...reference.matchAll(/number: '\d+', title: '([^']+)', description: '([^']+)'/g)].map(m=>[m[1],m[2]]);
  const actual = [...page.querySelectorAll('.service-entry')].map(n=>[n.querySelector('h3').textContent,n.querySelector('p').textContent]);
  expect(expected).toHaveLength(6);expect(actual).toEqual(expected);
});
it('restaura sobre, prazos e a ordem da referência com a galeria autorizada', () => {
  expect([...page.querySelectorAll('main > section')].map(n=>n.id)).toEqual(['inicio','sobre','servicos','prazos','equipamentos','contato']);
  expect(page.querySelector('#titulo-sobre').textContent).toBe('O terreno conta uma história. A gente sabe ouvir.');
  expect(page.querySelector('#titulo-processo').textContent).toBe('Prazos e etapas do projeto');
  expect(page.querySelectorAll('.process-track > li')).toHaveLength(5);
  expect(page.querySelector('#titulo-contato').textContent).toBe('Solicite seu orçamento.');
});
it('preserva marca corrigida, canais de contato e formulário seguro', () => {
  expect(page.title).toContain('Geoplan Engenharia e Consultoria Técnica');
  expect(page.querySelector('.brand img').getAttribute('src')).toBe('assets/logo.png');
  const links=[...page.querySelectorAll('a')].map(n=>n.getAttribute('href'));
  expect(links).toContain('tel:+5563992426210');expect(links).toContain('mailto:geoplanengenharia.to@gmail.com');expect(links).toContain('https://wa.me/5563992426210');
  expect(page.querySelector('form').hasAttribute('action')).toBe(false);
});
