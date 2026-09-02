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
const primaryLabels = ['Studio','Standard','Library'];
const secondaryLabels = ['Research','Contracts','Benchmarks','Documentation'];
const primaryRoutes = new Set(['/standard/','/library/']);
const secondaryRoutes = new Set(['/research/','/contracts/','/agents/','/benchmarks/','/docs/']);
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
  for (const label of primaryLabels) assert.match(header, new RegExp(`>${label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}<`), `${file}: missing primary ${label}`);
  for (const label of secondaryLabels) assert.match(header, new RegExp(`>${label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}<`), `${file}: missing secondary ${label}`);
  assert.match(header, />More<\/summary>/, `${file}: missing More disclosure`);
  assert.doesNotMatch(header, /class="nav-cta"/, `${file}: nav CTA should live in page content, not the shell`);
  const currentCount = (header.match(/aria-current="page"/g) ?? []).length;
  assert.equal(currentCount, primaryRoutes.has(route) || secondaryRoutes.has(route) ? 1 : 0, `${file}: invalid current-page state count`);
  assert.equal((footer.match(/<div class="footer-group">/g) ?? []).length, 3, `${file}: footer group count drifted`);
  const shellFingerprint = `${header.replace(/\saria-current="page"/g, '').replace(/aria-current="page"\s/g, '')}\n${footer}`;
  if (baseline === null) baseline = shellFingerprint;
  else assert.equal(shellFingerprint, baseline, `${file}: public shell differs from canonical baseline`);
}

console.log(`✓ focused public shell is identical across ${routes.length} routes`);
