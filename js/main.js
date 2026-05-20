/**
 * Geoplan — Interações do site
 * Rolagem fluida, menu mobile, formulário e animações
 */

document.addEventListener('DOMContentLoaded', () => {
  initYear();
  initHeaderScroll();
  initMobileMenu();
  initSmoothScroll();
  initActiveNav();
  initRevealOnScroll();
  initChartCarousel();
  initDotWave();
  initContactForm();
});

/** Ano dinâmico no rodapé */
function initYear() {
  const el = document.getElementById('ano');
  if (el) el.textContent = new Date().getFullYear();
}

/** Header com sombra ao rolar */
function initHeaderScroll() {
  const header = document.querySelector('[data-header]');
  if (!header) return;

  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/** Menu mobile */
function initMobileMenu() {
  const toggle = document.querySelector('[data-menu-toggle]');
  const menu = document.querySelector('[data-mobile-menu]');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const isOpen = !menu.classList.contains('hidden');
    menu.classList.toggle('hidden', isOpen);
    toggle.setAttribute('aria-expanded', String(!isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'Abrir menu' : 'Fechar menu');
  });

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menu.classList.add('hidden');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Abrir menu');
    });
  });
}

/** Rolagem fluida para links internos (reforço além do CSS) */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const id = anchor.getAttribute('href');
      if (!id || id === '#') return;

      const target = document.querySelector(id);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.pushState(null, '', id);
    });
  });
}

/** Destaca link da seção visível */
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          const href = link.getAttribute('href');
          link.classList.toggle('active', href === `#${id}`);
        });
      });
    },
    { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));
}

/** Animação ao entrar na viewport */
function initRevealOnScroll() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  reveals.forEach((el) => observer.observe(el));
}

/** Carrossel de gráficos no hero — sobreposição e rotação automática */
function initChartCarousel() {
  const carousel = document.querySelector('[data-chart-carousel]');
  if (!carousel) return;

  const slides = [...carousel.querySelectorAll('[data-chart-slide]')];
  const dots = [...carousel.querySelectorAll('[data-chart-dot]')];
  if (!slides.length) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const intervalMs = prefersReduced ? 12000 : 5000;
  let current = 0;
  let timer = null;

  const goTo = (index) => {
    const next = ((index % slides.length) + slides.length) % slides.length;
    if (next === current) return;
    const prev = current;

    slides[next].classList.add('is-active');
    slides[prev]?.classList.remove('is-active');
    slides[prev]?.classList.add('is-leaving');

    window.setTimeout(() => {
      slides[prev]?.classList.remove('is-leaving');
    }, 850);

    dots.forEach((dot, i) => {
      dot.classList.toggle('is-active', i === next);
      dot.setAttribute('aria-selected', String(i === next));
    });

    current = next;
    restartSlideAnimations(slides[next]);
  };

  const startAutoplay = () => {
    stopAutoplay();
    timer = setInterval(() => goTo(current + 1), intervalMs);
  };

  const stopAutoplay = () => {
    if (timer) clearInterval(timer);
    timer = null;
  };

  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      goTo(Number(dot.dataset.chartDot));
      startAutoplay();
    });
  });

  carousel.addEventListener('mouseenter', stopAutoplay);
  carousel.addEventListener('mouseleave', startAutoplay);

  goTo(0);
  if (!prefersReduced) startAutoplay();
}

/** Fundo de pontos com animação em onda (cores adaptadas por seção) */
function initDotWave() {
  const canvas = document.getElementById('dot-wave');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const spacing = 26;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let width = 0;
  let height = 0;
  let cols = 0;
  let rows = 0;
  let time = 0;
  let rafId = null;
  let frameCount = 0;
  const zones = { dark: [], light: [] };

  const updateZones = () => {
    zones.dark = [];
    zones.light = [];
    document.querySelectorAll('[data-dot-zone="dark"]').forEach((el) => {
      const r = el.getBoundingClientRect();
      zones.dark.push({ t: r.top, b: r.bottom, l: r.left, r: r.right });
    });
    document.querySelectorAll('[data-dot-zone="light"]').forEach((el) => {
      const r = el.getBoundingClientRect();
      zones.light.push({ t: r.top, b: r.bottom, l: r.left, r: r.right });
    });
  };

  const getZoneAt = (x, y) => {
    for (const z of zones.dark) {
      if (y >= z.t && y <= z.b && x >= z.l && x <= z.r) return 'dark';
    }
    for (const z of zones.light) {
      if (y >= z.t && y <= z.b && x >= z.l && x <= z.r) return 'light';
    }
    return 'light';
  };

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    cols = Math.ceil(width / spacing) + 2;
    rows = Math.ceil(height / spacing) + 2;
    updateZones();
  };

  const draw = () => {
    if (frameCount++ % 120 === 0) updateZones();

    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const x = i * spacing;
        const y = j * spacing;

        let wave = 0.55;
        if (!prefersReduced) {
          wave =
            0.5 +
            0.5 *
              Math.sin(x * 0.018 + time) *
              Math.sin(y * 0.016 + time * 0.85);
        }

        const zone = getZoneAt(x, y);
        const isDark = zone === 'dark';
        const alpha = isDark ? 0.22 + wave * 0.28 : 0.09 + wave * 0.15;
        const radius = isDark ? 1.2 + wave * 1 : 1.1 + wave * 0.9;

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = isDark
          ? `rgba(197, 184, 165, ${alpha})`
          : `rgba(176, 91, 40, ${alpha})`;
        ctx.fill();
      }
    }

    if (!prefersReduced) time += 0.022;
    rafId = requestAnimationFrame(draw);
  };

  resize();
  draw();

  requestAnimationFrame(() => {
    updateZones();
    requestAnimationFrame(updateZones);
  });

  window.addEventListener('resize', resize);
  window.addEventListener('scroll', updateZones, { passive: true });
  window.addEventListener('load', updateZones);

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = null;
    } else if (!rafId) {
      updateZones();
      draw();
    }
  });
}

/** Reinicia animações internas ao trocar de slide */
function restartSlideAnimations(slide) {
  if (!slide) return;
  slide.querySelectorAll('.spt-bar, .chart-vbar--anim, .chart-line-path').forEach((el) => {
    el.style.animation = 'none';
    void el.offsetHeight;
    el.style.animation = '';
  });
}

/** Formulário de contato — envia via mailto ou WhatsApp */
function initContactForm() {
  const form = document.getElementById('form-contato');
  const feedback = document.getElementById('form-feedback');
  if (!form || !feedback) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const btn = form.querySelector('button[type="submit"]');
    const btnText = btn?.querySelector('[data-submit-text]');
    const spinner = btn?.querySelector('[data-submit-spinner]');

    const data = {
      nome: form.nome.value.trim(),
      empresa: form.empresa.value.trim(),
      email: form.email.value.trim(),
      telefone: form.telefone.value.trim(),
      servico: form.servico.options[form.servico.selectedIndex].text,
      mensagem: form.mensagem.value.trim(),
    };

    const corpo = [
      `Nome: ${data.nome}`,
      data.empresa ? `Empresa/Obra: ${data.empresa}` : null,
      `E-mail: ${data.email}`,
      `Telefone: ${data.telefone}`,
      `Serviço: ${data.servico}`,
      '',
      'Mensagem:',
      data.mensagem,
    ]
      .filter(Boolean)
      .join('\n');

    btn?.setAttribute('disabled', 'true');
    if (btnText) btnText.textContent = 'Enviando...';
    spinner?.classList.remove('hidden');

    // Simula envio; abre cliente de e-mail com dados preenchidos
    await new Promise((r) => setTimeout(r, 600));

    const assunto = encodeURIComponent(`Orçamento SPT — ${data.nome}`);
    const corpoEncoded = encodeURIComponent(corpo);
    window.location.href = `mailto:geoplanengenharia.to@gmail.com?subject=${assunto}&body=${corpoEncoded}`;

    showFeedback(
      feedback,
      'success',
      'Seu cliente de e-mail foi aberto. Se não abrir, use o WhatsApp ou ligue para nós.'
    );

    form.reset();
    btn?.removeAttribute('disabled');
    if (btnText) btnText.textContent = 'Enviar mensagem';
    spinner?.classList.add('hidden');
  });
}

function showFeedback(el, type, message) {
  el.className = type;
  el.textContent = message;
  el.classList.remove('hidden');
  setTimeout(() => el.classList.add('hidden'), 8000);
}
