import { beforeEach, afterEach, expect, it, vi } from 'vitest';
const mocks = vi.hoisted(() => ({ hydrate: vi.fn(), init: vi.fn() }));
vi.mock('react-dom/client', () => ({ hydrateRoot: mocks.hydrate }));
vi.mock('../../js/motion.js', () => ({ initMotion: mocks.init }));
vi.mock('../../js/ui/Hero.jsx', () => ({ default: () => null }));
beforeEach(() => { vi.resetModules(); mocks.hydrate.mockClear(); mocks.init.mockClear(); });
afterEach(() => { document.body.replaceChildren(); });
it.each([true, false])('hidrata somente ilha presente=%s e liga movimento uma vez', async present => {
  if (present) document.body.innerHTML = '<div id="hero-react"></div>';
  await import('../../js/frontend-entry.jsx');
  expect(mocks.hydrate).toHaveBeenCalledTimes(present ? 1 : 0);
  expect(mocks.init).toHaveBeenCalledTimes(1);
});
