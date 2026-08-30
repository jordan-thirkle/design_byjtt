import assert from 'node:assert/strict';
import { PUBLIC_SHELL, getShellModel, normalisePath } from '../site-shell.mjs';

const expectedNav = ['Studio', 'Standard', 'Library'];
const expectedPaths = ['/studio', '/standard/', '/library/'];
const expectedSecondary = ['Research', 'Contracts', 'Benchmarks', 'Documentation'];
const expectedSecondaryPaths = ['/research/', '/contracts/', '/benchmarks/', '/docs/'];
const routes = ['/', ...expectedPaths, ...expectedSecondaryPaths];

assert.deepEqual(PUBLIC_SHELL.primaryNavigation.map(({ label }) => label), expectedNav);
assert.deepEqual(PUBLIC_SHELL.primaryNavigation.map(({ href }) => normalisePath(href)), expectedPaths.map(normalisePath));
assert.deepEqual(PUBLIC_SHELL.secondaryNavigation.map(({ label }) => label), expectedSecondary);
assert.deepEqual(PUBLIC_SHELL.secondaryNavigation.map(({ href }) => normalisePath(href)), expectedSecondaryPaths.map(normalisePath));
assert.equal(PUBLIC_SHELL.primaryAction.label, 'Open Studio');
assert.equal(normalisePath(PUBLIC_SHELL.primaryAction.href), '/studio/');

for (const route of routes) {
  const model = getShellModel(route);
  assert.equal(model.brand.href, '/');
  assert.equal(model.primaryNavigation.length, expectedNav.length);
  assert.equal(model.secondaryNavigation.length, expectedSecondary.length);
  const currentPrimary = model.primaryNavigation.filter(({ current }) => current);
  const currentSecondary = model.secondaryNavigation.filter(({ current }) => current);
  assert.equal(currentPrimary.length, expectedPaths.map(normalisePath).includes(normalisePath(route)) ? 1 : 0);
  assert.equal(currentSecondary.length, expectedSecondaryPaths.map(normalisePath).includes(normalisePath(route)) ? 1 : 0);
  assert.equal(model.footer.groups.length, 3);
}

console.log(`✓ simplified public shell contract validates across ${routes.length} public routes`);
