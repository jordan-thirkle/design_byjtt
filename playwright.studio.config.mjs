import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './app',
  testMatch: /browser\.spec\.mjs$/,
  timeout: 30_000,
  use: { browserName: 'chromium', headless: true },
  webServer: {
    command: 'node app/server.mjs',
    url: 'http://127.0.0.1:4173/',
    reuseExistingServer: false,
  },
});
