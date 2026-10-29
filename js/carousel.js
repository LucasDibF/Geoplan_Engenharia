/** Carrossel manual sobre scroll nativo: sem timers, autoplay ou dependências. */
export function initEquipmentCarousels(root = document) {
  const cleanups = [];
  root.querySelectorAll('[data-equipment-carousel]').forEach((gallery) => {
    const viewport = gallery.querySelector('[data-carousel-viewport]');
    const slides = [...viewport.children];
    const previous = gallery.querySelector('[data-carousel-prev]');
    const next = gallery.querySelector('[data-carousel-next]');
    const controls = gallery.querySelector('[data-carousel-controls]');
    const status = gallery.querySelector('[data-carousel-status]');
    let index = 0;
    const update = () => {
      index = Math.min(slides.length - 1, Math.max(0, Math.round(viewport.scrollLeft / (viewport.clientWidth || 1))));
      status.textContent = `Foto ${index + 1} de ${slides.length}`;
    };
    const show = (target) => {
      index = (target + slides.length) % slides.length;
      viewport.scrollTo({ left: index * viewport.clientWidth, behavior: 'instant' });
      update();
    };
    const listen = (target, event, handler) => {
      target.addEventListener(event, handler);
      cleanups.push(() => target.removeEventListener(event, handler));
    };
    listen(previous, 'click', () => show(index - 1));
    listen(next, 'click', () => show(index + 1));
    listen(viewport, 'scroll', update);
    listen(viewport, 'keydown', (event) => {
      const targets = { ArrowLeft: index - 1, ArrowRight: index + 1, Home: 0, End: slides.length - 1 };
      if (!Object.hasOwn(targets, event.key)) return;
      event.preventDefault();
      show(targets[event.key]);
    });
    controls.hidden = false;
    cleanups.push(() => { controls.hidden = true; });
  });
  return () => cleanups.forEach(cleanup => cleanup());
}
