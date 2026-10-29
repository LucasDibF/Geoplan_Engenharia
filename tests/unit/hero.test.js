import { createElement, act } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { renderToString } from 'react-dom/server';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const motion = vi.hoisted(() => ({ reduce: false, fail: false, reject: false, controls: null, handlers: {}, animate: vi.fn() }));
vi.mock('framer-motion', async () => {
  const { createElement, useRef } = await import('react');
  return {
    motion: {
      a: ({ children, initial, onHoverStart, onHoverEnd, onTapStart, onTap, onTapCancel, ...props }) => {
        motion.handlers = { onHoverStart, onHoverEnd, onTapStart, onTap, onTapCancel };
        return createElement('a', props, children);
      },
      span: ({ children, initial, variants, animate, transition, ...props }) => createElement('span', props, children),
    },
    useReducedMotion: () => motion.reduce,
    useAnimate: () => [useRef(null), motion.animate],
  };
});
import Hero from '../../js/ui/Hero.jsx';
vi.mock('framer-motion/mini', async () => {
  const { useRef } = await import('react');
  return { useAnimate: () => [useRef(null), motion.animate] };
});

let mount, root, preference;
beforeEach(() => {
  globalThis.IS_REACT_ACT_ENVIRONMENT = true;
  motion.reduce = false; motion.fail = false; motion.reject = false;
  motion.controls = { cancel: vi.fn() };
  motion.animate.mockReset().mockImplementation(() => {
    if (motion.fail) throw new Error('Animação indisponível');
    if (motion.reject) return Object.assign(Promise.reject(new Error('WAAPI indisponível')), { cancel: vi.fn() });
    return motion.controls;
  });
  preference = { matches: false, addEventListener: vi.fn(), removeEventListener: vi.fn() };
  vi.stubGlobal('matchMedia', vi.fn(() => preference));
  mount = document.createElement('div'); document.body.append(mount);
});
afterEach(async () => {
  if (root) await act(() => root.unmount());
  root = undefined; document.body.replaceChildren(); vi.unstubAllGlobals();
  delete globalThis.IS_REACT_ACT_ENVIRONMENT;
});
const render = async () => { root = createRoot(mount); await act(() => root.render(createElement(Hero))); };

describe('abertura React progressiva', () => {
  it('pré-renderiza título, CTA, contatos e ícones sem esconder conteúdo', () => {
    const html = renderToString(createElement(Hero));
    expect(html).toContain('Conhecer o solo é');
    expect(html).toContain('href="#contato"');
    expect(html).toContain('lucide-arrow-right'); expect(html).toContain('lucide-map-pin');
    expect(html).toContain('Palmas, TO');
    expect(html).not.toContain('opacity:0'); expect(html).not.toContain('visibility:hidden');
  });
  it('hidrata sem substituir título ou link e mantém a abertura sem foto', async () => {
    mount.innerHTML = renderToString(createElement(Hero));
    const title = mount.querySelector('h1'), link = mount.querySelector('.button');
    const error = vi.fn();
    await act(() => { root = hydrateRoot(mount, createElement(Hero), { onRecoverableError: error }); });
    expect(error).not.toHaveBeenCalled(); expect(mount.querySelector('h1')).toBe(title);
    expect(mount.querySelector('.button')).toBe(link); expect(mount.querySelector('img')).toBeNull();
  });
  it('encena uma única composição, mantendo texto quase opaco', async () => {
    await render();
    const steps = motion.animate.mock.calls[0][0];
    expect(steps).toHaveLength(3);
    expect(steps.find(([selector]) => selector === '.hero-title')[1].opacity[0]).toBeGreaterThan(0.8);
    expect(Math.max(...steps.map(([, , options]) => options.at + options.duration))).toBeLessThan(1);
  });
  it.each(['hook', 'media'])('respeita movimento reduzido desde o início: %s', async mode => {
    if (mode === 'hook') motion.reduce = true; else preference.matches = true;
    await render(); expect(motion.animate).not.toHaveBeenCalled();
    expect(mount.querySelector('h1').textContent).toContain('Conhecer o solo');
  });
  it('cancela efeitos ativos e restaura os estilos na mudança de preferência', async () => {
    await render();
    const title = mount.querySelector('h1');
    title.style.opacity = '.86'; title.style.transform = 'translateY(10px)';
    const change = preference.addEventListener.mock.calls[0][1];
    change({ matches: false }); expect(motion.controls.cancel).not.toHaveBeenCalled();
    change({ matches: true }); expect(motion.controls.cancel).toHaveBeenCalled();
    expect(title.style.opacity).toBe(''); expect(title.style.transform).toBe('');
    const liveChange = preference.addEventListener.mock.calls[1][1];
    await act(() => liveChange({ matches: true }));
    await act(() => liveChange({ matches: false }));
    await act(() => root.unmount()); root = undefined;
    expect(preference.removeEventListener).toHaveBeenCalledWith('change', change);
  });
  it.each(['throw', 'reject'])('mantém tudo visível se o motor falhar: %s', async type => {
    motion.fail = type === 'throw'; motion.reject = type === 'reject';
    await render(); await Promise.resolve();
    expect(mount.querySelector('h1').style.opacity).toBe('');
    expect(mount.querySelector('h1').style.transform).toBe('');
  });
  it('gestos têm controles canceláveis, inclusive hover e pressão ativos', async () => {
    await render();
    Object.values(motion.handlers).forEach(handler => handler());
    expect(motion.animate).toHaveBeenCalledTimes(6);
    expect(motion.controls.cancel).toHaveBeenCalled();
    const button = mount.querySelector('.button'), arrow = mount.querySelector('.hero-arrow');
    button.style.transform = 'scale(.985)'; arrow.style.transform = 'translateX(4px)';
    preference.addEventListener.mock.calls[0][1]({ matches: true });
    expect(button.style.transform).toBe(''); expect(arrow.style.transform).toBe('');
  });
  it.each(['hook', 'media'])('não começa gestos quando reduzido por %s', async mode => {
    if (mode === 'hook') motion.reduce = true; else preference.matches = true;
    await render(); Object.values(motion.handlers).forEach(handler => handler());
    expect(motion.animate).not.toHaveBeenCalled();
  });
  it('falha de gesto restaura o controle sem quebrar o contato', async () => {
    await render(); motion.fail = true;
    const arrow = mount.querySelector('.hero-arrow'); arrow.style.transform = 'translateX(4px)';
    expect(() => motion.handlers.onHoverStart()).not.toThrow();
    expect(arrow.style.transform).toBe('');
    expect(mount.querySelector('.button').getAttribute('href')).toBe('#contato');
  });
});

it('fundo pausa por escolha, fora da tela e em aba oculta, limpando o observer', async () => {
  let notify;
  const disconnect = vi.fn();
  vi.stubGlobal('IntersectionObserver', class {
    constructor(callback) { notify = callback; }
    observe() {}
    disconnect = disconnect;
  });
  const hidden = vi.spyOn(document, 'hidden', 'get').mockReturnValue(false);
  try {
    await render();
    const composition = mount.querySelector('.hero-composition');
    expect(composition.dataset.backgroundRunning).toBe('false');
    await act(() => notify([{ isIntersecting: true }]));
    expect(composition.dataset.backgroundRunning).toBe('true');
    const toggle = mount.querySelector('.background-toggle');
    await act(() => toggle.click());
    expect(composition.dataset.backgroundRunning).toBe('false');
    expect(toggle.getAttribute('aria-label')).toBe('Retomar animação do fundo');
    await act(() => toggle.click());
    expect(composition.dataset.backgroundRunning).toBe('true');
    hidden.mockReturnValue(true);
    await act(() => document.dispatchEvent(new Event('visibilitychange')));
    expect(composition.dataset.backgroundRunning).toBe('false');
    await act(() => notify([{ isIntersecting: false }]));
    hidden.mockReturnValue(false);
    await act(() => document.dispatchEvent(new Event('visibilitychange')));
    expect(composition.dataset.backgroundRunning).toBe('false');
    await act(() => notify([{ isIntersecting: true }]));
    expect(composition.dataset.backgroundRunning).toBe('true');
    await act(() => root.unmount()); root = undefined;
    expect(disconnect).toHaveBeenCalledOnce();
  } finally { hidden.mockRestore(); }
});
