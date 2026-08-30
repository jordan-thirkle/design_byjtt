import { defineConfig, devices } from '@playwright/test';

const baseURL = process.env.PUBLIC_SITE_TEST_URL || 'http://127.0.0.1:4174';

export default defineConfig({
  testDir: '.',
  testMatch: 'public-shell.spec.mjs',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['html', { open: 'never' }], ['list']] : 'list',
  use: {baseURL, trace: 'retain-on-failure'},
  webServer: process.env.PUBLIC_SITE_TEST_URL ? undefined : {
    command: 'node harness/public-server.mjs',
    url: `${baseURL}/`,
    reuseExistingServer: !process.env.CI
  },
  projects: [
    {name: 'mobile-320', use: {...devices['Desktop Chrome'], viewport: {width: 320, height: 800}}},
    {name: 'mobile-390', use: {...devices['Desktop Chrome'], viewport: {width: 390, height: 844}}},
    {name: 'tablet-768', use: {...devices['Desktop Chrome'], viewport: {width: 768, height: 1024}}},
    {name: 'desktop-1440', use: {...devices['Desktop Chrome'], viewport: {width: 1440, height: 1000}}}
  ]
});
