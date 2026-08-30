import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const routes = [
  ['/','index.html'],
  ['/standard/','standard.html'],
  ['/research/','research/index.html'],
  ['/contracts/','contracts/index.html'],
  ['/agents/','agents/index.html'],
  ['/library/','library/index.html'],
  ['/benchmarks/','benchmarks/index.html'],
  ['/docs/','docs/index.html']
];
const navLabels = ['Standard','Research','Contracts','Agents','Library','Benchmarks','Open Studio'];
let baseline = null;

for (const [route, file] of routes) {
  const html = await readFile(join(root, file), 'utf8');
  const header = html.match(/<header class="site-header">[\s\S]*?<\/header>/i)?.[0];
  const footer = html.match(/<footer class="footer">[\s\S]*?<\/footer>/i)?.[0];
  assert.ok(header, `${file}: missing canonical header`);
  assert.ok(footer, `${file}: missing canonical footer`);
  assert.match(html, /<a class="skip" href="#main">Skip to content<\/a>/i, `${file}: missing skip link`);
  assert.match(html, /<main[^>]*\bid=["']main["']/i, `${file}: missing main landmark`);
  assert.match(header, /<nav class="nav" aria-label="Primary navigation">/i, `${file}: missing named primary navigation`);
  assert.equal((header.match(/<a /g) ?? []).length, navLabels.length + 1, `${file}: unexpected public nav link count`);
  for (const label of navLabels) assert.match(header, new RegExp(`>${label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}<`), `${file}: missing ${label}`);
  if (route === '/') assert.doesNotMatch(header, /aria-current="page"/);
  else assert.match(header, /aria-current="page"/);
  assert.equal((footer.match(/<div class="footer-group">/g) ?? []).length, 3, `${file}: footer group count drifted`);
  const shellFingerprint = `${header.replace(/aria-current="page"/g, 'aria-current="ACTIVE"')}\n${footer}`;
  if (baseline === null) baseline = shellFingerprint;
  else assert.equal(shellFingerprint, baseline, `${file}: public shell differs from canonical baseline`);
}

console.log(`✓ rendered public shell is identical across ${routes.length} routes`);
