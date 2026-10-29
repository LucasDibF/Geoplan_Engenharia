import { useEffect, useRef, useState } from 'react';
import { motion, useAnimate, useReducedMotion } from 'framer-motion';
import { useAnimate as useNativeAnimate } from 'framer-motion/mini';
import { ArrowRight, ChevronDown, MapPin, Pause, Play } from 'lucide-react';

const ease = [0.16, 1, 0.3, 1];
const iconProps = { className: 'icon', 'aria-hidden': true, focusable: false, strokeWidth: 1.6 };

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
    let inView = false;
    const update = () => setBackgroundVisible(inView && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      update();
    });
    observer.observe(scope.current);
    document.addEventListener('visibilitychange', update);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', update);
    };
  }, [scope]);

  return <div ref={scope} className="hero-composition" data-background-running={backgroundVisible && !backgroundPaused}>
    <div className="hero-background" aria-hidden="true" />
    <div className="hero-orbits" aria-hidden="true" />
    <div className="hero-diagonals" aria-hidden="true" />
    <div className="page-width hero-stage">
      <div className="hero-copy">
        <p className="hero-kicker"><span />Engenharia que começa pelo solo</p>
        <h1 id="titulo-principal" className="hero-title" data-hero-part="title">Conhecer o solo é <em>construir</em> com segurança.</h1>
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
