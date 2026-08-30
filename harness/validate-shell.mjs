import assert from 'node:assert/strict';
import {PUBLIC_SHELL, getShellModel, normalisePath} from '../site-shell.mjs';

const expectedNav = ['Standard', 'Research', 'Contracts', 'Agents', 'Library', 'Benchmarks'];
const expectedPaths = ['/standard/', '/research/', '/contracts/', '/agents/', '/library/', '/benchmarks/'];
const routes = ['/', ...expectedPaths, '/docs/'];

assert.deepEqual(PUBLIC_SHELL.primaryNavigation.map((item) => item.label), expectedNav);
assert.deepEqual(PUBLIC_SHELL.primaryNavigation.map((item) => item.href), expectedPaths);
assert.equal(PUBLIC_SHELL.primaryAction.label, 'Open Studio');
assert.equal(PUBLIC_SHELL.primaryAction.href, '/studio');

for (const route of routes) {
  const model = getShellModel(route);
  assert.equal(model.brand.href, '/');
  assert.equal(model.primaryNavigation.length, expectedNav.length);
  assert.equal(model.primaryNavigation.filter((item) => item.current).length, route === '/' ? 0 : 1);
  assert.ok(model.footer.groups.length >= 2);
  assert.equal(normalisePath(route), route);
}

console.log(`✓ canonical shell contract validates across ${routes.length} public routes`);
