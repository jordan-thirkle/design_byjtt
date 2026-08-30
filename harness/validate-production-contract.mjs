import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

const root = new URL('../', import.meta.url);
const publicRoutes = [
  ['/', 'index.html'],
  ['/standard/', 'standard.html'],
  ['/research/', 'research/index.html'],
  ['/contracts/', 'contracts/index.html'],
  ['/agents/', 'agents/index.html'],
  ['/library/', 'library/index.html'],
  ['/benchmarks/', 'benchmarks/index.html'],
  ['/docs/', 'docs/index.html'],
  ['/studio', 'studio/index.html'],
];
const requiredResourceLinks = [
  '/standard.md',
  '/standard.json',
  '/standard.schema.json',
  '/llms.txt',
];

function file(path) {
  return join(root.pathname, path);
}

for (const [, relativePath] of publicRoutes) {
  const html = await readFile(file(relativePath), 'utf8');
  assert.match(html, /<html[^>]*lang=["']en-GB["']/i, `${relativePath}: missing en-GB document language`);
  assert.match(html, /<title>[^<]+<\/title>/i, `${relativePath}: missing title`);
  assert.match(html, /<meta[^>]+name=["']description["'][^>]+content=/i, `${relativePath}: missing description`);
  assert.match(html, /<link[^>]+rel=["']canonical["'][^>]+href=/i, `${relativePath}: missing canonical URL`);
}

const standard = await readFile(file('standard.json'), 'utf8');
const schema = await readFile(file('standard.schema.json'), 'utf8');
const llms = await readFile(file('llms.txt'), 'utf8');
assert.doesNotMatch(schema, /"const":\s*"0\.0"/);
assert.match(standard, /"version"\s*:\s*"0\.1"/);
assert.match(standard, /"publicSiteShell"/);
assert.match(llms, /https:\/\/design\.byjtt\.com\/standard\.md/);
for (const resource of requiredResourceLinks) {
  const local = resource === '/standard.md' ? 'standard.md' : resource.slice(1);
  await readFile(file(local), 'utf8');
}

const shellSource = await readFile(file('site-shell.mjs'), 'utf8');
assert.match(shellSource, /primaryNavigation/);
assert.match(shellSource, /renderPublicFooter/);
assert.match(shellSource, /aria-current/);
console.log(`✓ production contract integrity validated for ${publicRoutes.length} routes and ${requiredResourceLinks.length} public resources`);
