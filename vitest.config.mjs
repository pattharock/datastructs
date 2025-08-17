import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['src/**/tests/**/*.test.js', 'index.test.js'],
    environment: 'node',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['src/**/*.{js,mjs}'],
      reportsDirectory: './coverage',
    },
  },
});
