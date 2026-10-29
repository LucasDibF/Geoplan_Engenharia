/** Movimento progressivo: conteúdo já visível; o Hero pertence ao componente React. */
import { animate } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1];
const DEFAULT_KIT = { animate };
const controllers = new WeakMap();
const HERO = '.hero,[data-react-hero]';

export function motionAllowed(win = window) {
  if (!win || typeof win.matchMedia !== 'function' || typeof win.IntersectionObserver !== 'function') return false;
  return !win.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Compatibilidade: consulta o valor publicado sem reescrever o texto nem iniciar RAF. */
export function countUp(element) {
  const target = Number(element.dataset.count);
  return Number.isFinite(target) ? target : undefined;
}

/** Sem controlador, limpa somente os antigos estilos de reveal, nunca o Hero React. */
export function disarm(root = document) {
  const controller = controllers.get(root);
  if (controller) return controller.disarm();
  (root.documentElement || root).classList.remove('motion-armed');
  root.querySelectorAll('[data-reveal],[data-stagger] > *,[data-fab]').forEach((element) => {
    if (element.closest(HERO)) return;
    ['opacity', 'transform', 'clip-path'].forEach((property) => element.style.removeProperty(property));
  });
}

export function initMotion(root = document, win = window, kit = DEFAULT_KIT) {
  if (controllers.has(root)) return controllers.get(root);
  if (!root.documentElement || !motionAllowed(win) || typeof kit?.animate !== 'function') return null;

  let active = true;
  const cleanups = [];
  const controls = new Map();
  const styles = new Map();
  const remember = (element, properties) => {
    if (!styles.has(element)) styles.set(element, new Map());
    const saved = styles.get(element);
    properties.forEach((property) => {
      if (!saved.has(property)) saved.set(property, [element.style.getPropertyValue(property), element.style.getPropertyPriority(property)]);
    });
  };
  const restore = (element) => {
    styles.get(element)?.forEach(([value, priority], property) => {
      if (value) element.style.setProperty(property, value, priority);
      else element.style.removeProperty(property);
    });
  };
  const cancel = (element) => {
    const control = controls.get(element);
    controls.delete(element);
    // stop() pode persistir o frame atual no WAAPI. cancel() remove o efeito.
    try { control?.cancel(); } finally { restore(element); }
  };
  const controller = {
    disarm() {
      if (!active) return;
      active = false;
      cleanups.forEach((cleanup) => cleanup());
      controls.forEach((control, element) => {
        try { cancel(element); } catch { /* Uma falha não impede o restante da limpeza. */ }
      });
      styles.forEach((saved, element) => restore(element));
      root.documentElement.classList.remove('motion-armed');
      controllers.delete(root);
    },
  };
  controllers.set(root, controller);

  const listen = (target, type, handler, options) => {
    target.addEventListener(type, handler, options);
    cleanups.push(() => target.removeEventListener(type, handler, options));
  };
  const play = (element, keyframes, duration) => {
    if (!active) return;
    try {
      cancel(element);
      remember(element, Object.keys(keyframes));
      controls.set(element, kit.animate(element, keyframes, { duration, ease: EASE }));
    } catch {
      // Falhas tardias (observer, menu, hover) também devolvem a página ao estático.
      controller.disarm();
    }
  };
  const onScroll = (update) => {
    let frame = null;
    const request = () => {
      if (!active || frame !== null) return;
      frame = win.requestAnimationFrame(() => {
        frame = null;
        if (active) update();
      });
    };
    cleanups.push(() => { if (frame !== null) win.cancelAnimationFrame(frame); });
    listen(win, 'scroll', request, { passive: true });
    listen(win, 'resize', request, { passive: true });
    update();
  };

  try {
    root.documentElement.classList.add('motion-armed');
    const reduced = win.matchMedia('(prefers-reduced-motion: reduce)');
    const change = (event) => { if (event.matches) controller.disarm(); };
    if (typeof reduced.addEventListener === 'function') listen(reduced, 'change', change);
    else if (typeof reduced.addListener === 'function') {
      reduced.addListener(change);
      cleanups.push(() => reduced.removeListener(change));
    }

    const reveals = [...root.querySelectorAll('[data-reveal]')].filter((element) => !element.closest(HERO));
    if (reveals.length) {
      const observer = new win.IntersectionObserver((entries) => {
        if (!active) return;
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          observer.unobserve(entry.target);
          play(entry.target, { opacity: [0.86, 1], transform: ['translateY(10px)', 'translateY(0px)'] }, 0.42);
        });
      }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });
      cleanups.push(() => observer.disconnect());
      reveals.forEach((element) => observer.observe(element));
    }

    const header = root.querySelector('[data-header]');
    const bar = root.querySelector('[data-progress]');
    if (header && bar) {
      remember(bar, ['transform']);
      const scrolled = header.getAttribute('data-scrolled');
      cleanups.push(() => {
        if (scrolled === null) header.removeAttribute('data-scrolled');
        else header.setAttribute('data-scrolled', scrolled);
      });
      onScroll(() => {
        const doc = root.documentElement;
        const y = win.scrollY || doc.scrollTop || 0;
        const max = (doc.scrollHeight || 0) - (win.innerHeight || 0);
        const progress = max > 0 ? Math.min(Math.max(y / max, 0), 1) : 0;
        bar.style.transform = `scaleX(${progress.toFixed(4)})`;
        header.dataset.scrolled = y > 8 ? 'true' : 'false';
      });
    }

    const menu = root.querySelector('[data-mobile-menu]');
    if (menu && typeof win.MutationObserver === 'function') {
      let hidden = menu.hidden;
      const observer = new win.MutationObserver(() => {
        if (!active || menu.hidden === hidden) return;
        hidden = menu.hidden;
        if (hidden) cancel(menu);
        else play(menu, { transform: ['translateY(-8px)', 'translateY(0px)'] }, 0.28);
      });
      cleanups.push(() => observer.disconnect());
      observer.observe(menu, { attributes: true, attributeFilter: ['hidden'] });
    }

    root.querySelectorAll('[data-faq] details').forEach((item) => {
      const answer = item.querySelector('p');
      if (!answer) return;
      listen(item, 'toggle', () => {
        if (!active) return;
        if (item.open) play(answer, { opacity: [0.85, 1], transform: ['translateY(-4px)', 'translateY(0px)'] }, 0.24);
        else cancel(answer);
      });
    });

    const pointer = win.matchMedia('(hover: hover) and (pointer: fine)');
    root.querySelectorAll('.button,.text-link').forEach((button) => {
      if (button.closest(HERO)) return;
      const arrow = button.querySelector('svg');
      if (!arrow) return;
      listen(button, 'pointerenter', () => {
        if (pointer.matches) play(arrow, { transform: ['translateX(0px)', 'translateX(3px)'] }, 0.16);
      });
      listen(button, 'pointerleave', () => {
        if (pointer.matches) play(arrow, { transform: ['translateX(3px)', 'translateX(0px)'] }, 0.14);
      });
    });
  } catch {
    controller.disarm();
    return null;
  }
  return controller;
}
