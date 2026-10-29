import { useEffect, useRef, useState } from 'react';
import { motion, useAnimate, useReducedMotion } from 'framer-motion';
import { useAnimate as useNativeAnimate } from 'framer-motion/mini';
import { ArrowRight, ChevronDown, MapPin, Pause, Play } from 'lucide-react';

const ease = [0.16, 1, 0.3, 1];
const iconProps = { className: 'icon', 'aria-hidden': true, focusable: false, strokeWidth: 1.6 };
const heroWords = ['Conhecer ', ' o', ' solo', ' é', ' construir', ' com', ' segurança.'];

function WordsStaggerTitle({ ready }) {
  if (!ready) return <>Conhecer o solo é <em>construir</em> com segurança.</>;
  return heroWords.map((word, index) => {
    const content = word === 'construir' ? <em>{word}</em> : word;
    return <span key={`${word}-${index}`} className="hero-word" style={{ '--word-index': index }}>{content}{index < heroWords.length - 1 ? ' ' : ''}</span>;
  });
}

/** HTML pré-renderizado: hidratação acrescenta gestos, nunca é requisito para ler. */
export default function Hero() {
  const [scope, animate] = useAnimate();
  const [gestureScope, animateGesture] = useNativeAnimate();
  const preference = useReducedMotion();
  const [livePreference, setLivePreference] = useState(null);
  const reduce = livePreference ?? preference;
  const gestures = useRef(new Map());
  const [backgroundPaused, setBackgroundPaused] = useState(false);
  const [backgroundVisible, setBackgroundVisible] = useState(false);
  const [ditherMounted, setDitherMounted] = useState(false);
  const [titleStaggerReady, setTitleStaggerReady] = useState(false);
  const ditherCanvasRef = useRef(null);

  useEffect(() => setDitherMounted(true), []);
  useEffect(() => setTitleStaggerReady(true), []);
  const gesture = (selector, from, to, duration) => {
    if (reduce || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const element = scope.current.querySelector(selector);
    try {
      gestures.current.get(element)?.cancel();
      // O motor nativo não deixa MotionValues agendados regravarem o estado após cancel().
      gestures.current.set(element, animateGesture(element, { transform: [from, to] }, { duration, ease }));
    } catch {
      element.style.removeProperty('transform');
    }
  };

  useEffect(() => {
    if (reduce || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const root = scope.current;
    const parts = [...root.querySelectorAll('[data-hero-part]')];
    let controls;
    const restore = () => {
      controls?.cancel();
      gestures.current.forEach(control => control.cancel());
      gestures.current.clear();
      parts.forEach((part) => {
        part.style.removeProperty('opacity');
        part.style.removeProperty('transform');
        part.style.removeProperty('clip-path');
      });
    };
    try {
      // Sequência curta: título e ação são legíveis desde o primeiro quadro.
      controls = animate([
        ['.hero-title', { transform: ['translateY(12px)', 'none'], opacity: [0.86, 1] }, { duration: 0.5, ease, at: 0 }],
        ['.hero-intro', { transform: ['translateY(8px)', 'none'], opacity: [0.9, 1] }, { duration: 0.4, ease, at: 0.06 }],
        ['.hero-actions', { transform: ['translateY(8px)', 'none'], opacity: [0.9, 1] }, { duration: 0.4, ease, at: 0.08 }],
      ]);
      Promise.resolve(controls).catch(restore);
    } catch {
      restore();
    }
    // Uma mudança de preferência cancela WAAPI imediatamente, não ao terminar.
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onPreference = (event) => { if (event.matches) restore(); };
    preference.addEventListener('change', onPreference);
    return () => {
      preference.removeEventListener('change', onPreference);
      restore();
    };
  }, [animate, reduce, scope]);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const change = event => setLivePreference(event.matches);
    media.addEventListener('change', change);
    return () => media.removeEventListener('change', change);
  }, []);

  // O CSS cuida dos frames; o React só pausa o fundo fora de cena ou em aba oculta.
  useEffect(() => {
    if (typeof IntersectionObserver !== 'function') return;
    const isInView = () => {
      const rect = scope.current?.getBoundingClientRect();
      return Boolean(rect && rect.bottom > 0 && rect.top < window.innerHeight);
    };
    let inView = isInView();
    const update = () => {
      inView = isInView();
      setBackgroundVisible(inView && !document.hidden);
    };
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      update();
    });
    observer.observe(scope.current);
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    document.addEventListener('visibilitychange', update);
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      document.removeEventListener('visibilitychange', update);
    };
  }, [scope]);

  useEffect(() => {
    const canvas = ditherCanvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;
    let frame = 0;
    let width = 0;
    let height = 0;
    const pointer = { x: 0, y: 0, targetX: 0, targetY: 0, inside: false };
    const spacing = 14;
    const active = backgroundVisible && !backgroundPaused && !reduce;
    const interactionTarget = scope.current;
    if (!interactionTarget) return;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width || 1;
      height = rect.height || 1;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      pointer.x = width / 2;
      pointer.y = height / 2;
      pointer.targetX = pointer.x;
      pointer.targetY = pointer.y;
    };

    const draw = (time) => {
      context.clearRect(0, 0, width, height);
      if (!pointer.inside) {
        pointer.targetX = width * 0.72 + (active ? Math.sin(time / 1700) * width * 0.08 : 0);
        pointer.targetY = height * 0.38 + (active ? Math.cos(time / 2100) * height * 0.08 : 0);
      }
      const follow = pointer.inside && active ? 0.16 : 0.05;
      pointer.x += (pointer.targetX - pointer.x) * follow;
      pointer.y += (pointer.targetY - pointer.y) * follow;
      const radius = Math.min(width, height) * 0.46;
      const columns = Math.ceil(width / spacing) + 1;
      const rows = Math.ceil(height / spacing) + 1;
      context.fillStyle = '#d87331';
      for (let row = 0; row < rows; row += 1) {
        for (let column = 0; column < columns; column += 1) {
          const anchorX = column * spacing;
          const anchorY = row * spacing;
          const deltaX = anchorX - pointer.x;
          const deltaY = anchorY - pointer.y;
          const distance = Math.hypot(deltaX, deltaY);
          const proximity = Math.max(0, 1 - distance / radius);
          const influence = proximity * proximity * (3 - 2 * proximity);
          const displacement = influence * influence * 8;
          const directionX = distance > 0 ? deltaX / distance : 0;
          const directionY = distance > 0 ? deltaY / distance : 0;
          context.globalAlpha = 0.08 + influence * 0.26;
          context.beginPath();
          context.arc(anchorX + directionX * displacement, anchorY + directionY * displacement, 0.7 + influence * 0.8, 0, Math.PI * 2);
          context.fill();
        }
      }
      context.globalAlpha = 1;
      if (active) frame = window.requestAnimationFrame(draw);
    };

    const handlePointerMove = (event) => {
      if (!active) return;
      const rect = canvas.getBoundingClientRect();
      pointer.inside = true;
      pointer.targetX = event.clientX - rect.left;
      pointer.targetY = event.clientY - rect.top;
    };
    const handlePointerLeave = () => { pointer.inside = false; };
    const observer = typeof ResizeObserver === 'function' ? new ResizeObserver(resize) : null;
    resize();
    observer?.observe(canvas);
    interactionTarget.addEventListener('pointermove', handlePointerMove, { passive: true });
    interactionTarget.addEventListener('pointerleave', handlePointerLeave);
    draw(0);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      observer?.disconnect();
      interactionTarget.removeEventListener('pointermove', handlePointerMove);
      interactionTarget.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, [backgroundPaused, backgroundVisible, ditherMounted, reduce]);

  return <div ref={scope} className="hero-composition" data-background-running={backgroundVisible && !backgroundPaused}>
    <div className="hero-background" aria-hidden="true">{ditherMounted ? <canvas ref={ditherCanvasRef} className="hero-dither" /> : null}</div>
    <div className="hero-orbits" aria-hidden="true" />
    <div className="hero-diagonals" aria-hidden="true" />
    <div className="page-width hero-stage">
      <div className="hero-copy">
        <p className="hero-kicker"><span />Engenharia que começa pelo solo</p>
        <h1 id="titulo-principal" className="hero-title" data-hero-part="title"><WordsStaggerTitle ready={titleStaggerReady} /></h1>
        <p className="hero-intro" data-hero-part="intro">Investigações geotécnicas precisas para transformar as características do terreno em decisões de engenharia mais confiáveis.</p>
        <div className="hero-actions" data-hero-part="actions">
          <motion.a ref={gestureScope} className="button button-primary" href="#contato" data-hero-part="button" initial={false}
            onHoverStart={() => gesture('.hero-arrow', 'translateX(0px)', 'translateX(4px)', 0.16)}
            onHoverEnd={() => gesture('.hero-arrow', 'translateX(4px)', 'translateX(0px)', 0.14)}
            onTapStart={() => gesture('.hero-actions .button', 'scale(1)', 'scale(0.985)', 0.1)}
            onTap={() => gesture('.hero-actions .button', 'scale(0.985)', 'scale(1)', 0.14)}
            onTapCancel={() => gesture('.hero-actions .button', 'scale(0.985)', 'scale(1)', 0.14)}>
            Solicite uma proposta<span className="hero-arrow" data-hero-part="arrow"><ArrowRight {...iconProps} /></span>
          </motion.a>
          <a className="button button-outline" href="#servicos">Conheça os serviços <ChevronDown {...iconProps} /></a>
        </div>
      </div>
      <aside className="hero-territory"><p className="territory-title">Palmas, TO</p><p>Conhecimento local para projetos que respeitam o território e o futuro.</p><span><MapPin {...iconProps} /> Tocantins, Brasil</span></aside>
    </div>
    <div className="hero-explore"><span>01</span><span className="explore-rule" /><span>Explorar</span>
      <button type="button" className="background-toggle" hidden={!backgroundVisible}
        aria-label={backgroundPaused ? 'Retomar animação do fundo' : 'Pausar animação do fundo'}
        title={backgroundPaused ? 'Retomar animação do fundo' : 'Pausar animação do fundo'}
        onClick={() => setBackgroundPaused(paused => !paused)}>
        {backgroundPaused ? <Play {...iconProps} /> : <Pause {...iconProps} />}
      </button>
    </div>
  </div>;
}
