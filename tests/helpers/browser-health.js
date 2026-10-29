// Infra de teste, não faz parte do JavaScript público da aplicação.
export const criticalAssets = [
  'css/styles.css', 'css/site.css', 'js/main.js',
  'assets/fonts/dm-sans-400-normal.ttf',
  'assets/fonts/cormorant-garamond-400-normal.ttf',
  'assets/logo.png',
];

// Fotos fora da abertura são exigidas após percorrer a galeria, não no carregamento inicial.
export const galleryAssets = ['assets/equipment-field.jpg', 'assets/hero-bg.jpg'];

export const fontExpectations = [
  { family: 'DM Sans', weight: 400, size: 16, text: 'Investigações geotécnicas precisas' },
  { family: 'DM Sans', weight: 700, size: 11, text: 'Solicite uma proposta' },
  { family: 'Cormorant Garamond', weight: 400, size: 88, text: 'Conhecer o solo é construir com segurança.' },
  { family: 'Cormorant Garamond', weight: 400, size: 48, text: 'Investigação com propósito.' },
];

export function monitorBrowserHealth(page) {
  const state = { responses: [], requestFailures: [], pageErrors: [], consoleMessages: [] };
  const handlers = {
    response: response => state.responses.push({ url: response.url(), status: response.status(), resourceType: response.request().resourceType() }),
    requestfailed: request => state.requestFailures.push({ url: request.url(), error: request.failure()?.errorText || 'unknown request failure' }),
    pageerror: error => state.pageErrors.push(error.message),
    console: message => state.consoleMessages.push({ type: message.type(), text: message.text(), location: message.location() }),
  };
  for (const [event, handler] of Object.entries(handlers)) page.on(event, handler);
  return {
    snapshot: () => JSON.parse(JSON.stringify(state)),
    dispose: () => { for (const [event, handler] of Object.entries(handlers)) page.off(event, handler); },
  };
}

export function browserHealthProblems(state, baseURL, requiredAssets = criticalAssets) {
  const problems = [];
  for (const asset of requiredAssets) {
    const url = new URL(asset, baseURL).href;
    if (!state.responses.some(response => response.url === url && response.status >= 200 && response.status < 300)) problems.push(`Missing successful browser response: ${url}`);
  }
  // Sem exceção por host: falhas externas também tornam a verificação vermelha.
  for (const response of state.responses) if (response.status >= 400) problems.push(`HTTP ${response.status}: ${response.url}`);
  for (const failure of state.requestFailures) problems.push(`Request failed: ${failure.url}: ${failure.error}`);
  for (const error of state.pageErrors) problems.push(`Page error: ${error}`);
  for (const message of state.consoleMessages) {
    if (message.type === 'error' || (message.type === 'warning' && /failed|error|unhandled|decode|font|404/i.test(message.text))) problems.push(`Console ${message.type}: ${message.text}`);
  }
  return problems;
}

// Callback serializável para page.evaluate; usa somente document e seu argumento.
export function inspectLoadedFonts(expectations) {
  const faces = [...document.fonts];
  return expectations.map(expectation => {
    const query = `${expectation.weight} ${expectation.size}px "${expectation.family}"`;
    return {
      ...expectation, query,
      checked: document.fonts.check(query, expectation.text),
      // fonts.check pode ser true para uma família inexistente por fallback.
      loadedFace: faces.some(face => face.family.replace(/["']/g, '').toLowerCase() === expectation.family.toLowerCase() && face.status === 'loaded'),
    };
  });
}

export function fontHealthProblems(checks) {
  return checks.filter(check => !check.checked || !check.loadedFace).map(check => `Font not loaded: ${check.query}; check=${check.checked}; loadedFace=${check.loadedFace}`);
}
