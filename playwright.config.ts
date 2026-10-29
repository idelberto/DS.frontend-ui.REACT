import { defineConfig, devices } from '@playwright/test';

import { BASE_PATH } from './src/lib/base-path.ts';

const PORT = 3201;
const SERVER_STARTUP_TIMEOUT_MS = 30_000;
const SITE_URL = `http://localhost:${String(PORT)}${BASE_PATH}/`;

// Os testes navegam com caminho relativo (page.goto('tema/')): com barra na frente, o Playwright
// descartaria o basePath do baseURL.
export default defineConfig({
  testDir: 'e2e',
  forbidOnly: Boolean(process.env['CI']),
  use: {
    baseURL: SITE_URL,
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'celular', use: { ...devices['Pixel 7'] } },
  ],
  webServer: {
    command: 'npm run start',
    env: { PORT: String(PORT) },
    url: SITE_URL,
    reuseExistingServer: !process.env['CI'],
    timeout: SERVER_STARTUP_TIMEOUT_MS,
  },
});
