import { defineConfig, devices } from '@playwright/test';

const referenceBaseURL = 'http://127.0.0.1:4173';
const targetBaseURL = process.env.BENCHMARK_TARGET_URL || referenceBaseURL;
const externalTarget = Boolean(process.env.BENCHMARK_TARGET_URL);

export default defineConfig({
  testDir: './harness/tests',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['html', { open: 'never' }], ['list']] : 'list',
  use: {
    baseURL: targetBaseURL,
    trace: 'retain-on-failure'
  },
  webServer: externalTarget
    ? undefined
    : {
        command: 'node harness/server.mjs',
        url: `${referenceBaseURL}/health`,
        reuseExistingServer: !process.env.CI
      },
  projects: [
    {
      name: 'chromium-320x800',
      use: { ...devices['Desktop Chrome'], viewport: { width: 320, height: 800 } }
    },
    {
      name: 'chromium-390x844',
      use: { ...devices['Desktop Chrome'], viewport: { width: 390, height: 844 } }
    },
    {
      name: 'chromium-768x1024',
      use: { ...devices['Desktop Chrome'], viewport: { width: 768, height: 1024 } }
    },
    {
      name: 'chromium-1440x1000',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 1000 } }
    }
  ]
});
