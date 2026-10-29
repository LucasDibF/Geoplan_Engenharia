/** Interações progressivas do site institucional, sem transmissão de dados. */
const initialized = new WeakSet();

export function initMobileMenu(root = document, win = window) {
  const toggle = root.querySelector('[data-menu-toggle]');
  const menu = root.querySelector('[data-mobile-menu]');
  if (!toggle || !menu) return;

  const setOpen = (open, restoreFocus = false) => {
    menu.hidden = !open;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    if (restoreFocus) toggle.focus();
  };
  setOpen(false);
  toggle.addEventListener('click', () => setOpen(menu.hidden));
  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setOpen(false));
  });
  root.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !menu.hidden) setOpen(false, true);
  });
  root.addEventListener('click', (event) => {
    if (!menu.hidden && !menu.contains(event.target) && !toggle.contains(event.target)) setOpen(false);
  });
  const desktop = win.matchMedia('(min-width: 768px)');
  desktop.addEventListener('change', (event) => {
    if (event.matches) setOpen(false);
  });
  toggle.hidden = false;
}

export function initAnchors(root = document, win = window) {
  root.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const hash = link.getAttribute('href');
      if (hash === '#') return;
      const target = root.getElementById(hash.slice(1));
      if (!target) return;
      event.preventDefault();
      const reduced = win.matchMedia('(prefers-reduced-motion: reduce)').matches;
      target.scrollIntoView({ behavior: reduced ? 'instant' : 'smooth', block: 'start' });
      win.history.pushState(null, '', hash);
      // Mover o foco mantém a navegação por teclado no capítulo escolhido.
      const heading = target.matches('main') ? target : target.querySelector('h1,h2');
      if (heading) {
        if (!heading.hasAttribute('tabindex')) heading.setAttribute('tabindex', '-1');
        heading.focus({ preventScroll: true });
      }
    });
  });
}

export function initActiveNav(root = document, win = window) {
  const sections = root.querySelectorAll('main section[id]');
  const links = root.querySelectorAll('.nav-link');
  if (!sections.length || !links.length || !win.IntersectionObserver) return;
  const observer = new win.IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.forEach((link) => {
        if (link.getAttribute('href') === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-15% 0px -65% 0px', threshold: 0 });
  sections.forEach((section) => observer.observe(section));
}

export function initFaq(root = document) {
  const faq = root.querySelector('[data-faq]');
  if (!faq) return;
  const items = [...faq.querySelectorAll('details')];
  items.forEach((item) => {
    item.addEventListener('toggle', () => {
      if (item.open) items.forEach((other) => { if (other !== item) other.open = false; });
    });
  });
}

export function buildMailto(form) {
  const value = (name) => (form.elements.namedItem(name)?.value || '').trim();
  const service = value('servico');
  const file = form.elements.namedItem('anexo')?.files[0];
  const lines = [
    `Nome: ${value('nome')}`,
    value('empresa') ? `Empresa: ${value('empresa')}` : '',
    `E-mail: ${value('email')}`,
    `Telefone/WhatsApp: ${value('telefone')}`,
    value('cidade') ? `Cidade/UF: ${value('cidade')}` : '',
    value('tipo-obra') ? `Tipo de obra: ${value('tipo-obra')}` : '',
    `Serviço: ${service}`,
    value('furos') ? `Qtd. furos/ensaios: ${value('furos')}` : '',
    file ? `Anexo informado: ${file.name} (anexe manualmente no e-mail ou envie pelo WhatsApp)` : '',
    '', 'Mensagem:', value('mensagem') || '(sem mensagem adicional)',
  ];
  const subject = encodeURIComponent(`Orçamento — ${service} — ${value('nome')}`);
  const body = encodeURIComponent(lines.join('\n'));
  return `mailto:geoplanengenharia.to@gmail.com?subject=${subject}&body=${body}`;
}

export function showFeedback(element, state, message) {
  element.hidden = false;
  element.dataset.state = state;
  element.textContent = message;
}

export function initContactForm(root = document, options = {}) {
  const form = root.getElementById('form-contato');
  const feedback = root.getElementById('form-feedback');
  if (!form || !feedback) return;
  const navigate = options.navigate || ((url) => window.location.assign(url));
  const delay = options.delay ?? 100;
  const button = form.querySelector('button[type="submit"]');
  const label = button.querySelector('[data-submit-text]');
  const spinner = button.querySelector('[data-submit-spinner]');
  const idleLabel = label.textContent;
  const fields = [...form.querySelectorAll('[required]')];
  const validateField = (field) => {
    field.setCustomValidity('');
    if (!field.value.trim()) field.setCustomValidity('Preencha este campo para preparar o orçamento.');
    field.setAttribute('aria-invalid', String(!field.validity.valid));
    if (!field.validity.valid) field.setAttribute('aria-errormessage', 'form-feedback');
    else field.removeAttribute('aria-errormessage');
  };
  fields.forEach((field) => {
    field.addEventListener('input', () => {
      if (field.hasAttribute('aria-invalid')) validateField(field);
    });
    field.addEventListener('change', () => {
      if (field.hasAttribute('aria-invalid')) validateField(field);
    });
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (button.disabled) return;
    fields.forEach(validateField);
    if (!form.checkValidity()) {
      showFeedback(feedback, 'error', 'Confira os campos obrigatórios e use um e-mail válido. Seus dados permanecem no formulário.');
      form.querySelector(':invalid').focus();
      form.reportValidity();
      return;
    }
    button.disabled = true;
    form.setAttribute('aria-busy', 'true');
    label.textContent = 'Preparando mensagem…';
    spinner.hidden = false;
    feedback.hidden = true;
    try {
      const url = buildMailto(form);
      await new Promise((resolve) => setTimeout(resolve, delay));
      const ready = new CustomEvent('geoplan:email-ready', { detail: { url }, cancelable: true });
      if (form.dispatchEvent(ready)) navigate(url);
      showFeedback(feedback, 'prepared', 'Mensagem preparada para o seu aplicativo de e-mail. Revise e envie por lá; anexe o arquivo manualmente. Se o aplicativo não abrir, use o endereço de e-mail ou o WhatsApp ao lado.');
    } catch {
      showFeedback(feedback, 'error', 'Não foi possível abrir o aplicativo de e-mail. Seus dados foram mantidos. Escreva para geoplanengenharia.to@gmail.com ou fale pelo WhatsApp.');
    } finally {
      button.disabled = false;
      form.removeAttribute('aria-busy');
      label.textContent = idleLabel;
      spinner.hidden = true;
    }
  });
  // Disponível só depois do listener: sem JS não há GET nativo com dados na URL.
  form.hidden = false;
}

export function initSite(root = document, win = window) {
  if (initialized.has(root)) return;
  initialized.add(root);
  const year = root.getElementById('ano');
  if (year) year.textContent = String(new Date().getFullYear());
  initMobileMenu(root, win);
  initAnchors(root, win);
  initActiveNav(root, win);
  initFaq(root);
  initContactForm(root);
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => initSite(), { once: true });
else initSite();
