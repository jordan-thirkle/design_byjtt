import assert from 'node:assert/strict';
import { PUBLIC_SHELL, getShellModel, normalisePath } from '../site-shell.mjs';

const expectedNav = ['Standard', 'Research', 'Contracts', 'Agents', 'Library', 'Benchmarks'];
const expectedPaths = ['/standard/', '/research/', '/contracts/', '/agents/', '/library/', '/benchmarks/'];
const routes = ['/', ...expectedPaths, '/docs/'];

assert.deepEqual(PUBLIC_SHELL.primaryNavigation.map(({ label }) => label), expectedNav);
assert.deepEqual(PUBLIC_SHELL.primaryNavigation.map(({ href }) => href), expectedPaths);
assert.equal(PUBLIC_SHELL.primaryAction.label, 'Open Studio');
assert.equal(PUBLIC_SHELL.primaryAction.href, '/studio');

for (const route of routes) {
  const model = getShellModel(route);
  assert.equal(model.brand.href, '/');
  assert.equal(model.primaryNavigation.length, expectedNav.length);
  const currentCount = model.primaryNavigation.filter(({ current }) => current).length;
  assert.equal(currentCount, expectedPaths.includes(route) ? 1 : 0);
  assert.equal(model.footer.groups.length, 3);
  assert.equal(normalisePath(route), route);
}

console.log(`✓ canonical shell contract validates across ${routes.length} public routes`);
