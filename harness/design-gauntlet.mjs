import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

const root = new URL('../', import.meta.url);
const file = (path) => join(root.pathname, path);
const routes = [
  ['/', 'index.html'], ['standard', 'standard.html'], ['research', 'research/index.html'],
  ['contracts', 'contracts/index.html'], ['agents', 'agents/index.html'], ['library', 'library/index.html'],
  ['benchmarks', 'benchmarks/index.html'], ['docs', 'docs/index.html']
];

const scores = new Map();
const checks = [];
function pass(category, label, ok, detail = '') {
  checks.push({ category, label, ok, detail });
  if (!scores.has(category)) scores.set(category, []);
  scores.get(category).push(ok);
}

const home = await readFile(file('index.html'), 'utf8');
const css = await readFile(file('site.css'), 'utf8');
const agent = JSON.parse(await readFile(file('agent.json'), 'utf8'));
const shell = await readFile(file('site-shell.mjs'), 'utf8');
const studio = await readFile(file('app/index.html'), 'utf8');

pass('clarity', 'focused hero statement', /<h1>Make better digital products with AI\.<\/h1>/.test(home));
pass('clarity', 'primary action in first viewport', /class="button primary" href="\/studio"/.test(home));
pass('clarity', 'four-step workflow', ['Describe','Direct','Check','Publish'].every((x) => home.includes(`<span>${x}</span>`)));
pass('clarity', 'first viewport layout contract', /min-height:calc\(100svh - 68px\)/.test(css));

pass('information architecture', 'three primary destinations', /primaryNavigation:\s*\[[\s\S]*?Studio[\s\S]*?Standard[\s\S]*?Library/.test(shell));
pass('information architecture', 'secondary disclosure', /<details class="nav-more">/.test(home));
pass('information architecture', 'supporting routes retained', routes.length === 8);

for (const [route, path] of routes) {
  const html = await readFile(file(path), 'utf8');
  pass('accessibility', `${route} document language`, /<html[^>]*lang="en-GB"/.test(html));
  pass('accessibility', `${route} skip link`, /class="skip" href="#main"/.test(html));
  pass('accessibility', `${route} main landmark`, /<main id="main">/.test(html));
  pass('accessibility', `${route} named navigation`, /aria-label="Primary navigation"/.test(html));
  pass('shell', `${route} canonical footer`, /<footer class="footer">/.test(html));
}

pass('agent discoverability', 'agent entry point', agent.name === 'ByJTT Design');
pass('agent discoverability', 'canonical standard', agent.canonical?.standard === '/standard.json');
pass('agent discoverability', 'recommended workflow', Array.isArray(agent.recommendedWorkflow) && agent.recommendedWorkflow.length >= 5);
pass('agent discoverability', 'explicit source-of-truth rule', agent.rules?.some((x) => x.includes('/standard.json')) === true);

pass('copy quality', 'no internal foundation label on Studio', !studio.includes('FOUNDATION'));
pass('copy quality', 'homepage avoids process-heavy lifecycle copy', !home.includes('Suggested → Generated → Inspected → Verified → Executed → Human-approved'));
pass('copy quality', 'plain-language Studio prompt', studio.includes('Tell ByJTT what to make'));

pass('responsive', 'mobile breakpoint', /@media\(max-width:850px\)/.test(css));
pass('responsive', 'mobile primary navigation retained', /\.nav-primary a:not\(:first-child\)\{display:none\}/.test(css));
pass('responsive', 'reduced motion', /prefers-reduced-motion:reduce/.test(css));

pass('design quality', 'contrast tokens', /--muted:#5f5d57/.test(css) && /--paper:#fbfaf6/.test(css));
pass('design quality', 'paper surface contrast', /\.callout p\{color:var\(--muted\)/.test(css));
pass('design quality', 'bounded layout', /max-width:var\(--max\)/.test(css));

const report = [...scores].map(([category, values]) => {
  const score = Math.round((values.filter(Boolean).length / values.length) * 10 * 10) / 10;
  return { category, score, passed: values.filter(Boolean).length, total: values.length };
});

for (const row of report) assert.ok(row.score >= 9, `${row.category}: ${row.score}/10 is below the 9/10 release threshold`);

console.log(JSON.stringify({ threshold: 9, scores: report, checks }, null, 2));
