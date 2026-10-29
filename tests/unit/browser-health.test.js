import { EventEmitter } from 'node:events';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { criticalAssets, galleryAssets, fontExpectations, monitorBrowserHealth, browserHealthProblems, inspectLoadedFonts, fontHealthProblems } from '../helpers/browser-health.js';

const base = 'http://127.0.0.1:4173/';
const response = (asset, status = 200) => ({ url: () => new URL(asset, base).href, status: () => status, request: () => ({ resourceType: () => asset.endsWith('.woff2') ? 'font' : 'other' }) });
const healthy = () => {
  const page = new EventEmitter(), monitor = monitorBrowserHealth(page);
  criticalAssets.forEach(asset => page.emit('response', response(asset)));
  return { page, monitor };
};
afterEach(() => vi.unstubAllGlobals());

describe('saúde dos assets do navegador', () => {
  it('exige respostas reais bem-sucedidas de todos os assets críticos', () => {
    const { monitor } = healthy(); expect(browserHealthProblems(monitor.snapshot(), base)).toEqual([]);
    expect(criticalAssets).toContain('assets/fonts/dm-sans-400-normal.ttf');
    expect(criticalAssets).toContain('assets/fonts/cormorant-garamond-400-normal.ttf');
  });
  it.each(criticalAssets)('reprova 404 em %s, incluindo cada fonte/CSS', asset => {
    const page = new EventEmitter(), monitor = monitorBrowserHealth(page);
    criticalAssets.forEach(path => page.emit('response', response(path, path === asset ? 404 : 200)));
    const problems = browserHealthProblems(monitor.snapshot(), base);
    expect(problems).toContain(`HTTP 404: ${new URL(asset, base).href}`);
    expect(problems).toContain(`Missing successful browser response: ${new URL(asset, base).href}`);
  });
  it('não considera download ausente ou redirecionamento como sucesso', () => {
    const { page, monitor } = healthy(); const state = monitor.snapshot();
    state.responses = state.responses.filter(item => !item.url.endsWith('dm-sans-400-normal.ttf'));
    expect(browserHealthProblems(state, base)).toContain(`Missing successful browser response: ${base}assets/fonts/dm-sans-400-normal.ttf`);
    page.emit('response', response('optional', 302)); expect(browserHealthProblems(monitor.snapshot(), base)).toEqual([]);
    state.responses.push({ url: `${base}assets/fonts/dm-sans-400-normal.ttf`, status: 302 });
    expect(browserHealthProblems(state, base).length).toBe(1);
  });
  it('reprova falhas externas sem ignorar host, pageerror e console relevante', () => {
    const { page, monitor } = healthy();
    page.emit('response', response('https://external.example/image.jpg', 503));
    page.emit('requestfailed', { url: () => 'https://external.example/font.woff2', failure: () => ({ errorText: 'net::ERR_FAILED' }) });
    page.emit('requestfailed', { url: () => 'https://external.example/other', failure: () => null });
    page.emit('pageerror', new Error('unexpected runtime failure'));
    page.emit('console', { type: () => 'error', text: () => 'Failed to load stylesheet', location: () => ({ url: base }) });
    page.emit('console', { type: () => 'warning', text: () => 'Failed to decode downloaded font', location: () => ({}) });
    page.emit('console', { type: () => 'log', text: () => 'debug', location: () => ({}) });
    const problems = browserHealthProblems(monitor.snapshot(), base);
    expect(problems).toHaveLength(6); expect(problems.join('\n')).toContain('external.example');
    expect(problems.join('\n')).toContain('Page error: unexpected runtime failure');
    expect(problems.join('\n')).toContain('Console warning: Failed to decode downloaded font');
  });
  it('preserva mensagens e snapshots sem mutação, e remove listeners', () => {
    const { page, monitor } = healthy(); const snapshot = monitor.snapshot(); snapshot.responses.length = 0;
    expect(monitor.snapshot().responses).toHaveLength(criticalAssets.length);
    page.emit('console', { type: () => 'warning', text: () => 'Diagnostic notice', location: () => ({}) });
    expect(monitor.snapshot().consoleMessages).toHaveLength(1);
    monitor.dispose(); page.emit('pageerror', new Error('after disposal')); expect(monitor.snapshot().pageErrors).toEqual([]);
  });
});

describe('fontes reais, não apenas document.fonts.ready', () => {
  const fonts = (faces, check = vi.fn(() => true)) => {
    vi.stubGlobal('document', { fonts: { check, [Symbol.iterator]: () => faces[Symbol.iterator]() } });
    return check;
  };
  it('confere família, peso e texto de uso real nas duas fontes', () => {
    const check = fonts([{ family: 'DM Sans', status: 'loaded' }, { family: '"Cormorant Garamond"', status: 'loaded' }]);
    const result = inspectLoadedFonts(fontExpectations);
    expect(fontHealthProblems(result)).toEqual([]);
    for (const item of fontExpectations) expect(check).toHaveBeenCalledWith(`${item.weight} ${item.size}px "${item.family}"`, item.text);
    expect(result).toHaveLength(4);
  });
  it('reprova fallback de família inexistente mesmo quando fonts.check retorna true', () => {
    fonts([]); const result = inspectLoadedFonts(fontExpectations);
    expect(result.every(item => item.checked)).toBe(true); expect(fontHealthProblems(result)).toHaveLength(4);
  });
  it('reprova face em erro ou loading, e check falso apesar de face carregada', () => {
    fonts([{ family: 'DM Sans', status: 'error' }, { family: 'Cormorant Garamond', status: 'loading' }]);
    expect(fontHealthProblems(inspectLoadedFonts(fontExpectations))).toHaveLength(4);
    fonts([{ family: 'DM Sans', status: 'loaded' }, { family: 'Cormorant Garamond', status: 'loaded' }], vi.fn(() => false));
    expect(fontHealthProblems(inspectLoadedFonts(fontExpectations))).toHaveLength(4);
  });
});


it('exige as duas fotos da galeria depois da navegação, sem torná-las críticas para a abertura', () => {
  const { page, monitor } = healthy();
  expect(browserHealthProblems(monitor.snapshot(), base)).toEqual([]);
  const required = [...criticalAssets, ...galleryAssets];
  expect(browserHealthProblems(monitor.snapshot(), base, required)).toHaveLength(2);
  galleryAssets.forEach(asset => page.emit('response', response(asset)));
  expect(browserHealthProblems(monitor.snapshot(), base, required)).toEqual([]);
});
