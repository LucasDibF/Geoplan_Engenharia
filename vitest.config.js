import { defineConfig } from 'vitest/config';
export default defineConfig({
  oxc: { jsx: { runtime: 'automatic' } },
  test: {
    environment: 'jsdom',
    environmentOptions: { jsdom: { url: 'https://geoplan.test/' } },
    include: ['tests/unit/**/*.test.js'],
    restoreMocks: true,
    reporters: ['default', 'json'],
    outputFile: { json: 'coverage/unit-results.json' },
    coverage: {
      provider: 'v8',
      include: ['js/**/*.{js,jsx}'],
      exclude: ['js/frontend.js'],
      reporter: ['text', 'json-summary', 'json', 'html', 'lcov'],
      thresholds: { statements: 80, functions: 80, lines: 80, branches: 75 },
    },
  },
});
