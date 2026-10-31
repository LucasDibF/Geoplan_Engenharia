import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { beforeEach, afterEach, describe, it, expect, vi } from 'vitest';
import { initMobileMenu, initAnchors, initActiveNav, initFaq, buildMailto, initContactForm, showFeedback, initSite } from '../../js/main.js';

const body = readFileSync(resolve('tests/fixtures/legacy-interactions.html'), 'utf8').match(/<body[^>]*>([\s\S]*)<\/body>/)[1];
let root, media, win;
beforeEach(() => {
  const frame = document.createElement('iframe');
  document.body.replaceChildren(frame);
  root = frame.contentDocument;
  root.body.innerHTML = body;
  media = new Map();
  win = {
    matchMedia: vi.fn(query => {
      if (!media.has(query)) media.set(query, { matches: false, addEventListener: vi.fn() });
      return media.get(query);
    }),
    history: { pushState: vi.fn() },
  };
});
afterEach(() => { vi.useRealTimers(); vi.unstubAllGlobals(); });
const submit = form => form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
const fill = () => {
  const form = root.getElementById('form-contato');
  for (const [name, value] of Object.entries({ nome: ' Ana Silva ', telefone: '63999999999', email: 'ana@example.com', cidade: 'Palmas, TO', servico: 'Sondagem SPT' })) form.elements.namedItem(name).value = value;
  return form;
};

describe('menu mobile', () => {
  it('abre, fecha, mantém foco e fecha com Escape', () => {
    initMobileMenu(root, win);
    const toggle = root.querySelector('[data-menu-toggle]');
    const menu = root.querySelector('[data-mobile-menu]');
    expect(menu.hidden).toBe(true);
    expect(toggle.getAttribute('aria-expanded')).toBe('false');
    root.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    toggle.click(); expect(menu.hidden).toBe(false);
    expect(toggle.getAttribute('aria-label')).toBe('Fechar menu');
    menu.querySelector('div').click(); expect(menu.hidden).toBe(false);
    root.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab' })); expect(menu.hidden).toBe(false);
    root.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(menu.hidden).toBe(true); expect(root.activeElement).toBe(toggle);
    toggle.click(); toggle.click(); expect(menu.hidden).toBe(true);
  });
  it('fecha por link, clique externo e passagem ao desktop', () => {
    initMobileMenu(root, win);
    const toggle = root.querySelector('[data-menu-toggle]'), menu = root.querySelector('[data-mobile-menu]');
    toggle.click(); menu.querySelector('a').click(); expect(menu.hidden).toBe(true);
    toggle.click(); root.querySelector('h1').click(); expect(menu.hidden).toBe(true);
    toggle.click();
    const change = media.get('(min-width: 768px)').addEventListener.mock.calls[0][1];
    change({ matches: false }); expect(menu.hidden).toBe(false);
    change({ matches: true }); expect(menu.hidden).toBe(true);
  });
  it('não quebra sem controles opcionais', () => {
    root.querySelector('[data-menu-toggle]').remove(); expect(() => initMobileMenu(root, win)).not.toThrow();
    root.body.innerHTML = '<button data-menu-toggle></button>'; expect(() => initMobileMenu(root, win)).not.toThrow();
  });
});

describe('âncoras e indicação de seção', () => {
  it.each([false, true])('respeita reduced motion=%s e move foco ao título', reduced => {
    win.matchMedia = vi.fn(() => ({ matches: reduced }));
    const target = root.getElementById('servicos'); target.scrollIntoView = vi.fn();
    initAnchors(root, win); root.querySelector('a[href="#servicos"]').click();
    expect(target.scrollIntoView).toHaveBeenCalledWith({ behavior: reduced ? 'instant' : 'smooth', block: 'start' });
    expect(win.history.pushState).toHaveBeenCalledWith(null, '', '#servicos');
    expect(root.activeElement).toBe(target.querySelector('h2'));
    target.querySelector('h2').setAttribute('tabindex', '-1'); root.querySelector('a[href="#servicos"]').click();
    expect(target.querySelector('h2').getAttribute('tabindex')).toBe('-1');
  });
  it('skip link foca main; ignora destinos ausentes e seções sem heading', () => {
    root.getElementById('conteudo').scrollIntoView = vi.fn();
    root.body.insertAdjacentHTML('beforeend', '<a href="#">Vazio</a><a href="#ausente">Ausente</a><a href="#numeros">Números</a>');
    root.getElementById('numeros').scrollIntoView = vi.fn();
    initAnchors(root, win); root.querySelector('.skip-link').click(); expect(root.activeElement.id).toBe('conteudo');
    root.querySelector('a[href="#"]').click(); root.querySelector('a[href="#ausente"]').click();
    root.querySelector('a[href="#numeros"]').click(); expect(root.getElementById('numeros').scrollIntoView).toHaveBeenCalled();
  });
  it('observa seções e usa aria-current apenas nos links correspondentes', () => {
    let callback; const observe = vi.fn();
    win.IntersectionObserver = class { constructor(cb, options) { callback = cb; expect(options.threshold).toBe(0); } observe = observe; };
    initActiveNav(root, win); expect(observe).toHaveBeenCalledTimes(10);
    callback([{ isIntersecting: false, target: root.getElementById('servicos') }]);
    expect(root.querySelector('[aria-current]')).toBeNull();
    callback([{ isIntersecting: true, target: root.getElementById('servicos') }]);
    expect(root.querySelector('[aria-current]').getAttribute('href')).toBe('#servicos');
    callback([{ isIntersecting: true, target: root.getElementById('processo') }]);
    expect(root.querySelector('.desktop-nav a[href="#servicos"]').hasAttribute('aria-current')).toBe(false);
  });
  it('tolera ausência de observer, links ou seções', () => {
    expect(() => initActiveNav(root, win)).not.toThrow();
    win.IntersectionObserver = vi.fn(); root.querySelectorAll('.nav-link').forEach(x => x.remove()); initActiveNav(root, win); expect(win.IntersectionObserver).not.toHaveBeenCalled();
    root.body.innerHTML = '<a class="nav-link"></a>'; initActiveNav(root, win); expect(win.IntersectionObserver).not.toHaveBeenCalled();
  });
});

describe('FAQ', () => {
  it('mantém apenas um aberto e permite fechar todos', () => {
    initFaq(root); const items = root.querySelectorAll('details');
    items[0].open = true; items[0].dispatchEvent(new Event('toggle'));
    items[1].open = true; items[1].dispatchEvent(new Event('toggle'));
    expect(items[0].open).toBe(false); expect(items[1].open).toBe(true);
    items[1].open = false; items[1].dispatchEvent(new Event('toggle')); expect([...items].some(x => x.open)).toBe(false);
    root.querySelector('[data-faq]').remove(); expect(() => initFaq(root)).not.toThrow();
  });
});

describe('formulário por mailto', () => {
  it('gera mensagem mínima sem inventar upload', () => {
    const url = new URL(buildMailto(fill()));
    expect(url.protocol).toBe('mailto:'); expect(url.pathname).toBe('geoplanengenharia.to@gmail.com');
    expect(url.searchParams.get('subject')).toBe('Orçamento — Sondagem SPT — Ana Silva');
    expect(url.searchParams.get('body')).toContain('(sem mensagem adicional)');
    expect(url.searchParams.get('body')).not.toContain('Anexo informado:');
  });
  it('preserva campos opcionais, acentos e referência ao arquivo', () => {
    const form = fill();
    for (const [name, value] of Object.entries({ empresa: 'Projeto & Obra', 'tipo-obra': 'Residencial', furos: '6', mensagem: 'Acesso & localização: São José' })) form.elements.namedItem(name).value = value;
    Object.defineProperty(form.elements.namedItem('anexo'), 'files', { value: [new File(['pdf'], 'planta.pdf', { type: 'application/pdf' })] });
    const body = new URL(buildMailto(form)).searchParams.get('body');
    expect(body).toContain('Empresa: Projeto & Obra'); expect(body).toContain('Tipo de obra: Residencial'); expect(body).toContain('Qtd. furos/ensaios: 6'); expect(body).toContain('planta.pdf (anexe manualmente'); expect(body).toContain('São José');
  });
  it('invalida campos vazios/whitespace e e-mail inválido, sem navegar', () => {
    const navigate = vi.fn(); initContactForm(root, { navigate }); const form = root.querySelector('form');
    form.reportValidity = vi.fn(); submit(form);
    expect(navigate).not.toHaveBeenCalled(); expect(root.getElementById('form-feedback').dataset.state).toBe('error'); expect(root.activeElement.id).toBe('nome');
    const name = root.getElementById('nome'); name.value = '   '; name.dispatchEvent(new Event('input')); expect(name.validity.valid).toBe(false);
    expect(name.getAttribute('aria-errormessage')).toBe('form-feedback');
    name.value = 'Ana'; name.dispatchEvent(new Event('change')); expect(name.getAttribute('aria-invalid')).toBe('false');
    expect(name.hasAttribute('aria-errormessage')).toBe(false);
    fill(); root.getElementById('email').value = 'inválido'; submit(form); expect(root.activeElement.id).toBe('email'); expect(navigate).not.toHaveBeenCalled();
  });
  it('não mostra erro antes de interagir com a validação', () => {
    initContactForm(root); const name = root.getElementById('nome');
    name.dispatchEvent(new Event('input')); name.dispatchEvent(new Event('change')); expect(name.hasAttribute('aria-invalid')).toBe(false);
  });
  it('prepara mailto, bloqueia envio duplo e restaura estado sem perder dados', async () => {
    vi.useFakeTimers(); const navigate = vi.fn(); initContactForm(root, { navigate, delay: 20 }); const form = fill(); const button = form.querySelector('button');
    submit(form); submit(form); expect(button.disabled).toBe(true); expect(form.getAttribute('aria-busy')).toBe('true'); expect(button.querySelector('[data-submit-spinner]').hidden).toBe(false);
    await vi.runAllTimersAsync(); expect(navigate).toHaveBeenCalledTimes(1); expect(navigate.mock.calls[0][0]).toMatch(/^mailto:/);
    expect(button.disabled).toBe(false); expect(form.hasAttribute('aria-busy')).toBe(false); expect(root.getElementById('form-feedback').dataset.state).toBe('prepared'); expect(form.elements.namedItem('nome').value.trim()).toBe('Ana Silva'); expect(button.querySelector('[data-submit-text]').textContent).toBe('Preparar e-mail de orçamento');
  });
  it('explica falha de abertura e mantém dados para recuperação', async () => {
    vi.useFakeTimers(); initContactForm(root, { navigate: () => { throw new Error('no mail app'); } }); const form = fill(); submit(form); await vi.runAllTimersAsync();
    expect(root.getElementById('form-feedback').dataset.state).toBe('error'); expect(root.getElementById('form-feedback').textContent).toContain('WhatsApp'); expect(form.elements.namedItem('cidade').value).toBe('Palmas, TO'); expect(form.querySelector('button').disabled).toBe(false);
  });
  it('permite interceptar preparação sem abrir aplicativo externo', async () => {
    vi.useFakeTimers(); const navigate = vi.fn(); initContactForm(root, { navigate }); const form = fill(); let prepared;
    form.addEventListener('geoplan:email-ready', event => { event.preventDefault(); prepared = event.detail.url; });
    submit(form); await vi.runAllTimersAsync(); expect(navigate).not.toHaveBeenCalled(); expect(prepared).toMatch(/^mailto:/); expect(root.getElementById('form-feedback').dataset.state).toBe('prepared');
  });
  it('abre o e-mail e redireciona para a página de obrigado', async () => {
    vi.useFakeTimers(); const assign = vi.fn(); const open = vi.fn(() => ({})); vi.stubGlobal('window', { location: { assign }, open }); initContactForm(root); submit(fill()); await vi.runAllTimersAsync(); expect(open).toHaveBeenCalledWith(expect.stringContaining('mailto:'), '_blank', 'noopener,noreferrer'); expect(assign).toHaveBeenCalledWith('obrigado.html');
  });
  it('tolera formulário ou feedback ausentes e mostra estado explícito', () => {
    root.getElementById('form-contato').remove(); expect(() => initContactForm(root)).not.toThrow();
    root.body.innerHTML = '<form id="form-contato"></form>'; expect(() => initContactForm(root)).not.toThrow();
    const element = root.createElement('p'); showFeedback(element, 'error', 'Confira o e-mail'); expect(element.hidden).toBe(false); expect(element.textContent).toBe('Confira o e-mail');
  });
});

describe('inicialização progressiva', () => {
  it('atualiza ano e não duplica listeners', () => {
    initSite(root, win); initSite(root, win); expect(root.getElementById('ano').textContent).toBe(String(new Date().getFullYear()));
    root.querySelector('[data-menu-toggle]').click(); expect(root.querySelector('[data-mobile-menu]').hidden).toBe(false);
  });
  it('inicializa documento sem componentes opcionais', () => {
    root.body.innerHTML = ''; expect(() => initSite(root, win)).not.toThrow();
  });
  it.each(['loading', 'complete'])('boot automático com readyState=%s', async state => {
    vi.resetModules(); const listener = vi.fn();
    const fakeDoc = { readyState: state, getElementById: () => null, querySelector: () => null, querySelectorAll: () => [], addEventListener: listener };
    vi.stubGlobal('document', fakeDoc);
    await import('../../js/main.js');
    if (state === 'loading') { expect(listener).toHaveBeenCalledWith('DOMContentLoaded', expect.any(Function), { once: true }); listener.mock.calls[0][1](); }
    else expect(listener).not.toHaveBeenCalled();
  });
});


it('prepara mailto com os seis campos da referência sem exigir anexos ou campos antigos', () => {
  const form = fill();
  ['cidade','tipo-obra','furos','anexo'].forEach(name => form.elements.namedItem(name).remove());
  const url = new URL(buildMailto(form));
  expect(url.pathname).toBe('geoplanengenharia.to@gmail.com');
  expect(url.searchParams.get('body')).toContain('Nome: Ana Silva');
  expect(url.searchParams.get('body')).not.toContain('Cidade/UF:');
});
