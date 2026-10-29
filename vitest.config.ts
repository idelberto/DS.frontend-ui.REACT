import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    // Os testes de componente (.test.tsx) pedem o jsdom no próprio arquivo, com @vitest-environment.
    include: ['src/**/*.test.{ts,tsx}', 'registry/**/*.test.{ts,tsx}', 'test/**/*.test.ts'],
  },
});
