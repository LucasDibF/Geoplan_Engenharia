import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { afterEach, beforeEach, describe, it, expect, vi } from 'vitest';
import { countUp, disarm, initMotion, motionAllowed } from '../../js/motion.js';

const body = readFileSync(resolve('tests/fixtures/legacy-interactions.html'), 'utf8').match(/<body[^>]*>([\s\S]*)<\/body>/)[1];
let root;
let observers;
let mutations;

class FakeObserver {
  constructor(callback, options) {
    this.callback = callback;
    this.options = options;
    this.targets = [];
    this.disconnect = vi.fn(() => { this.targets = []; });
    this.unobserve = vi.fn((target) => { this.targets = this.targets.filter((item) => item !== target); });
    observers.push(this);
  }
  observe(target) { this.targets.push(target); }
  enter(target = this.targets[0], isIntersecting = true) { this.callback([{ target, isIntersecting }]); }
}

class FakeMutationObserver {
  constructor(callback) {
    this.callback = callback;
    this.observe = vi.fn();
    this.disconnect = vi.fn();
    mutations.push(this);
  }
}

const createKit = () => ({
  animate: vi.fn((element, frames) => {
    Object.entries(frames).forEach(([property, values]) => { element.style[property] = values[0]; });
    return { cancel: vi.fn(), stop: vi.fn() };
  }),
  animateSequence: vi.fn(),
});

const createWindow = (overrides = {}) => {
  const media = new Map();
  let frame = 0;
  return {
    matchMedia: vi.fn((query) => {
      if (!media.has(query)) media.set(query, { matches: query.includes('pointer: fine'), addEventListener: vi.fn(), removeEventListener: vi.fn() });
      return media.get(query);
    }),
    IntersectionObserver: FakeObserver,
    MutationObserver: FakeMutationObserver,
    requestAnimationFrame: vi.fn(() => ++frame),
    cancelAnimationFrame: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    scrollY: 0,
    innerHeight: 900,
    ...overrides,
  };
};

const reduce = (win, matches = true) => {
  const media = win.matchMedia('(prefers-reduced-motion: reduce)');
  media.matches = matches;
  media.addEventListener.mock.calls[0][1]({ matches });
};
const scroll = (win, type = 'scroll') => {
  win.addEventListener.mock.calls.filter(([event]) => event === type).forEach(([, handler]) => handler());
};
const flush = (win) => {
  const frames = win.requestAnimationFrame.mock.calls.splice(0);
  frames.forEach(([callback]) => callback());
};

beforeEach(() => {
  const frame = document.createElement('iframe');
  document.body.replaceChildren(frame);
  root = frame.contentDocument;
  root.body.innerHTML = body;
  observers = [];
  mutations = [];
});
afterEach(() => { disarm(root); document.body.replaceChildren(); });

describe('permissão e inicialização explícita', () => {
  it('nega reduced motion e navegadores sem requisitos', () => {
    const win = createWindow();
    win.matchMedia('(prefers-reduced-motion: reduce)').matches = true;
    const kit = createKit();
    expect(motionAllowed(win)).toBe(false);
    expect(initMotion(root, win, kit)).toBeNull();
    expect(kit.animate).not.toHaveBeenCalled();
    expect(observers).toHaveLength(0);
    expect(win.addEventListener).not.toHaveBeenCalled();
    expect(motionAllowed(createWindow({ IntersectionObserver: undefined }))).toBe(false);
    expect(motionAllowed({})).toBe(false);
    expect(motionAllowed(null)).toBe(false);
    expect(motionAllowed()).toBe(false);
    expect(initMotion(root, createWindow(), null)).toBeNull();
    expect(initMotion({}, createWindow(), createKit())).toBeNull();
  });

  it('não auto-inicializa, importa Framer em jsdom e aceita o kit padrão', () => {
    expect(document.documentElement.classList.contains('motion-armed')).toBe(false);
    expect(motionAllowed(createWindow())).toBe(true);
    expect(initMotion(root, createWindow())).not.toBeNull();
  });

  it('é idempotente por documento, sem duplicar eventos ou animar Hero/FAB', () => {
    const win = createWindow();
    const kit = createKit();
    const controller = initMotion(root, win, kit);
    const listeners = win.addEventListener.mock.calls.length;
    expect(initMotion(root, win, kit)).toBe(controller);
    expect(win.addEventListener).toHaveBeenCalledTimes(listeners);
    expect(observers).toHaveLength(1);
    expect(mutations).toHaveLength(1);
    expect(kit.animate).not.toHaveBeenCalled();
    expect(kit.animateSequence).not.toHaveBeenCalled();
    controller.disarm();
    const next = initMotion(root, win, kit);
    expect(next).not.toBe(controller);
    controller.disarm();
    expect(root.documentElement.classList.contains('motion-armed')).toBe(true);
  });
});

describe('conteúdo permanente', () => {
  it('mantém indicadores publicados estáveis em todo o ciclo', () => {
    const values = [...root.querySelectorAll('[data-count]')].map((element) => element.textContent);
    const win = createWindow();
    const kit = createKit();
    initMotion(root, win, kit);
    observers[0].targets.slice().forEach((element) => observers[0].enter(element));
    [...root.querySelectorAll('[data-count]')].forEach((element) => expect(countUp(element)).toBe(Number(element.dataset.count)));
    reduce(win);
    expect([...root.querySelectorAll('[data-count]')].map((element) => element.textContent)).toEqual(values);
    expect(win.requestAnimationFrame).not.toHaveBeenCalled();
    const invalid = root.createElement('span');
    invalid.dataset.count = 'muitos';
    expect(countUp(invalid)).toBeUndefined();
  });

  it('revela somente data-reveal já visível, nunca listas ou Hero', () => {
    const hero = root.querySelector('.hero');
    hero.setAttribute('data-reveal', '');
    const kit = createKit();
    initMotion(root, createWindow(), kit);
    const observer = observers[0];
    expect(observer.targets).not.toContain(hero);
    expect(observer.targets.every((element) => element.hasAttribute('data-reveal'))).toBe(true);
    expect(observer.targets.some((element) => element.hasAttribute('data-stagger'))).toBe(false);
    const target = observer.targets[0];
    observer.enter(target, false);
    expect(kit.animate).not.toHaveBeenCalled();
    observer.enter(target);
    expect(observer.unobserve).toHaveBeenCalledWith(target);
    expect(kit.animate).toHaveBeenCalledWith(target, {
      opacity: [0.86, 1], transform: ['translateY(10px)', 'translateY(0px)'],
    }, { duration: 0.42, ease: [0.16, 1, 0.3, 1] });
    expect(target.style.opacity).toBe('0.86');
    expect(hero.style.opacity).toBe('');
    expect(root.querySelector('[data-stagger] > *').style.opacity).toBe('');
  });
});

describe('leitura de rolagem', () => {
  it('coalesce RAF do cabeçalho e restaura estilos anteriores', () => {
    const bar = root.querySelector('[data-progress]');
    const header = root.querySelector('[data-header]');
    bar.style.setProperty('transform', 'scaleX(.2)', 'important');
    header.dataset.scrolled = 'previous';
    Object.defineProperty(root.documentElement, 'scrollHeight', { value: 1900, configurable: true });
    const win = createWindow({ scrollY: 500 });
    const controller = initMotion(root, win, createKit());
    expect(bar.style.transform).toBe('scaleX(0.5000)');
    expect(header.dataset.scrolled).toBe('true');
    scroll(win);
    scroll(win);
    scroll(win, 'resize');
    expect(win.requestAnimationFrame).toHaveBeenCalledTimes(1);
    win.scrollY = 2000;
    flush(win);
    expect(bar.style.transform).toBe('scaleX(1.0000)');
    controller.disarm();
    expect(bar.style.transform).toBe('scaleX(.2)');
    expect(bar.style.getPropertyPriority('transform')).toBe('important');
    expect(header.dataset.scrolled).toBe('previous');
  });

  it('trata medidas nulas, scrollTop, viewport ausente e limites negativos', () => {
    root.documentElement.scrollTop = 20;
    const win = createWindow({ innerHeight: 0 });
    initMotion(root, win, createKit());
    expect(root.querySelector('[data-progress]').style.transform).toBe('scaleX(0.0000)');
    expect(root.querySelector('[data-header]').dataset.scrolled).toBe('true');
    Object.defineProperty(root.documentElement, 'scrollHeight', { value: 2000, configurable: true });
    win.scrollY = -20;
    scroll(win);
    flush(win);
    expect(root.querySelector('[data-progress]').style.transform).toBe('scaleX(0.0000)');
  });
});

describe('menu, FAQ e setas', () => {
  it('observa somente hidden e não assume o controle funcional do menu', () => {
    const menu = root.querySelector('[data-mobile-menu]');
    menu.hidden = true;
    const kit = createKit();
    initMotion(root, createWindow(), kit);
    expect(mutations[0].observe).toHaveBeenCalledWith(menu, { attributes: true, attributeFilter: ['hidden'] });
    mutations[0].callback();
    expect(kit.animate).not.toHaveBeenCalled();
    menu.hidden = false;
    mutations[0].callback();
    expect(kit.animate).toHaveBeenCalledWith(menu, {
      transform: ['translateY(-8px)', 'translateY(0px)'],
    }, expect.objectContaining({ duration: 0.28 }));
    expect(menu.hidden).toBe(false);
    menu.hidden = true;
    mutations[0].callback();
    expect(kit.animate.mock.results[0].value.cancel).toHaveBeenCalledTimes(1);
    expect(menu.hidden).toBe(true);
    expect(menu.style.opacity).toBe('');
  });

  it('anima somente a resposta aberta e cancela ao fechar', () => {
    const kit = createKit();
    initMotion(root, createWindow(), kit);
    const item = root.querySelector('[data-faq] details');
    item.dispatchEvent(new root.defaultView.Event('toggle'));
    expect(kit.animate).not.toHaveBeenCalled();
    item.open = true;
    item.dispatchEvent(new root.defaultView.Event('toggle'));
    expect(kit.animate).toHaveBeenCalledWith(item.querySelector('p'), {
      opacity: [0.85, 1], transform: ['translateY(-4px)', 'translateY(0px)'],
    }, expect.objectContaining({ duration: 0.24 }));
    item.open = false;
    item.dispatchEvent(new root.defaultView.Event('toggle'));
    expect(kit.animate.mock.results[0].value.cancel).toHaveBeenCalledTimes(1);
    expect(item.querySelector('p').style.transform).toBe('');
  });

  it('move setas fora do Hero apenas para hover com ponteiro preciso e sem eventos duplicados', () => {
    const kit = createKit();
    const win = createWindow();
    initMotion(root, win, kit);
    initMotion(root, win, kit);
    const button = root.querySelector('#contato .button');
    const fire = (element, type) => element.dispatchEvent(new root.defaultView.Event(type));
    fire(root.querySelector('.hero .button'), 'pointerenter');
    expect(kit.animate).not.toHaveBeenCalled();
    fire(button, 'pointerenter');
    fire(button, 'pointerleave');
    expect(kit.animate).toHaveBeenCalledTimes(2);
    expect(kit.animate.mock.results[0].value.cancel).toHaveBeenCalledTimes(1);
    expect(kit.animate.mock.calls[1][1].transform).toEqual(['translateX(3px)', 'translateX(0px)']);
    win.matchMedia('(hover: hover) and (pointer: fine)').matches = false;
    fire(button, 'pointerenter');
    fire(button, 'pointerleave');
    expect(kit.animate).toHaveBeenCalledTimes(2);
  });
});

describe('desarme completo e falhas', () => {
  it('cancela todos controles, observers, eventos e RAF ao mudar reduced motion ao vivo', () => {
    const kit = createKit();
    const win = createWindow();
    const button = root.querySelector('#contato .button');
    const item = root.querySelector('[data-faq] details');
    const removeButton = vi.spyOn(button, 'removeEventListener');
    const removeFaq = vi.spyOn(item, 'removeEventListener');
    const menu = root.querySelector('[data-mobile-menu]');
    menu.hidden = true;
    const controller = initMotion(root, win, kit);
    const reveal = observers[0].targets[0];
    observers[0].enter(reveal);
    menu.hidden = false;
    mutations[0].callback();
    item.open = true;
    item.dispatchEvent(new root.defaultView.Event('toggle'));
    button.dispatchEvent(new root.defaultView.Event('pointerenter'));
    scroll(win);
    const queued = [...win.requestAnimationFrame.mock.calls];
    reduce(win, false);
    expect(root.documentElement.classList.contains('motion-armed')).toBe(true);
    reduce(win);
    expect(root.documentElement.classList.contains('motion-armed')).toBe(false);
    kit.animate.mock.results.forEach(({ value }) => {
      expect(value.cancel).toHaveBeenCalledTimes(1);
      expect(value.stop).not.toHaveBeenCalled();
    });
    expect(observers[0].disconnect).toHaveBeenCalledTimes(1);
    expect(mutations[0].disconnect).toHaveBeenCalledTimes(1);
    expect(win.cancelAnimationFrame.mock.calls).toEqual([[1]]);
    win.addEventListener.mock.calls.forEach((args) => expect(win.removeEventListener).toHaveBeenCalledWith(...args));
    const media = win.matchMedia('(prefers-reduced-motion: reduce)');
    expect(media.removeEventListener).toHaveBeenCalledWith(...media.addEventListener.mock.calls[0]);
    expect(removeButton).toHaveBeenCalledWith('pointerenter', expect.any(Function), undefined);
    expect(removeButton).toHaveBeenCalledWith('pointerleave', expect.any(Function), undefined);
    expect(removeFaq).toHaveBeenCalledWith('toggle', expect.any(Function), undefined);
    expect(reveal.style.opacity).toBe('');
    expect(menu.style.transform).toBe('');
    expect(root.querySelector('[data-progress]').style.transform).toBe('');
    expect(root.querySelector('[data-header]').hasAttribute('data-scrolled')).toBe(false);
    const calls = kit.animate.mock.calls.length;
    observers[0].enter(reveal);
    menu.hidden = true;
    mutations[0].callback();
    item.dispatchEvent(new root.defaultView.Event('toggle'));
    button.dispatchEvent(new root.defaultView.Event('pointerenter'));
    scroll(win);
    queued.forEach(([callback]) => callback());
    expect(kit.animate).toHaveBeenCalledTimes(calls);
    expect(root.querySelector('[data-progress]').style.transform).toBe('');
    controller.disarm();
    expect(observers[0].disconnect).toHaveBeenCalledTimes(1);
  });

  it('desarma por export e restaura estilos quando animate falha depois de alterar o elemento', () => {
    const win = createWindow();
    const kit = createKit();
    kit.animate.mockImplementation((element) => {
      element.style.opacity = '0.86';
      element.style.transform = 'translateY(10px)';
      throw new Error('WAAPI indisponível');
    });
    initMotion(root, win, kit);
    const target = observers[0].targets[0];
    observers[0].enter(target);
    expect(target.style.opacity).toBe('');
    expect(target.style.transform).toBe('');
    expect(root.documentElement.classList.contains('motion-armed')).toBe(false);
    expect(observers[0].disconnect).toHaveBeenCalled();
    expect(win.removeEventListener).toHaveBeenCalledTimes(2);
    initMotion(root, win, createKit());
    disarm(root);
    expect(root.documentElement.classList.contains('motion-armed')).toBe(false);
  });

  it('continua limpando mesmo quando um controle cancel falha', () => {
    const kit = createKit();
    const controller = initMotion(root, createWindow(), kit);
    observers[0].targets.slice(0, 2).forEach((target) => observers[0].enter(target));
    kit.animate.mock.results[0].value.cancel.mockImplementation(() => { throw new Error('cancel'); });
    controller.disarm();
    expect(kit.animate.mock.results[1].value.cancel).toHaveBeenCalled();
    expect(root.documentElement.classList.contains('motion-armed')).toBe(false);
  });

  it('limpa inicialização parcial e aceita documentos sem alvos e sem MutationObserver', () => {
    const win = createWindow({ MutationObserver: class { constructor() { throw new Error('observer'); } } });
    expect(initMotion(root, win, createKit())).toBeNull();
    expect(observers[0].disconnect).toHaveBeenCalled();
    root.body.innerHTML = '<a class="button">Sem ícone</a><div data-faq><details></details></div>';
    const minimal = createWindow({ MutationObserver: undefined });
    expect(initMotion(root, minimal, createKit())).not.toBeNull();
    expect(minimal.addEventListener).not.toHaveBeenCalled();
  });

  it('remove listener legado de media query e funciona sem listener de media query', () => {
    const media = { matches: false, addListener: vi.fn(), removeListener: vi.fn() };
    const win = createWindow({ matchMedia: () => media });
    initMotion(root, win, createKit());
    media.addListener.mock.calls[0][0]({ matches: true });
    expect(media.removeListener).toHaveBeenCalledWith(media.addListener.mock.calls[0][0]);
    expect(initMotion(root, createWindow({ matchMedia: () => ({ matches: false }) }), createKit())).not.toBeNull();
  });

  it('limpa resíduos legados sem tocar estilos ou cleanup do Hero React', () => {
    root.documentElement.classList.add('motion-armed');
    const element = root.querySelector('[data-reveal]');
    element.style.cssText = 'opacity:0;transform:translateY(2rem);clip-path:inset(10%)';
    const hero = root.querySelector('.hero');
    hero.setAttribute('data-reveal', '');
    hero.style.opacity = '.9';
    disarm(root);
    expect(root.documentElement.classList.contains('motion-armed')).toBe(false);
    expect(element.style.opacity).toBe('');
    expect(element.style.transform).toBe('');
    expect(element.style.clipPath).toBe('');
    expect(hero.style.opacity).toBe('0.9');
  });
});
