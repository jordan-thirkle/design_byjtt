import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const PUBLIC_PAGES = [
  'index.html', 'standard.html', 'research/index.html', 'contracts/index.html',
  'agents/index.html', 'library/index.html', 'benchmarks/index.html', 'docs/index.html', 'app/index.html',
];

const INTERNAL_TERMS = [
  'PRODUCT.md', 'DESIGN.md', 'AGENTS.md', 'CI/CD', 'pull request', 'commit SHA',
  'blob SHA', 'repository', 'repo', 'branch', 'build pipeline', 'runtime log',
  'Vercel deployment', 'GitHub workflow', 'source of truth', 'implementation detail',
];

function visibleMain(html) {
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] ?? '';
  return main
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

const findings = [];
const sentenceOwners = new Map();
for (const relative of PUBLIC_PAGES) {
  const file = path.join(ROOT, relative);
  assert.ok(fs.existsSync(file), `missing public page: ${relative}`);
  const text = visibleMain(fs.readFileSync(file, 'utf8'));
  const lower = text.toLowerCase();

  for (const term of INTERNAL_TERMS) {
    if (lower.includes(term.toLowerCase())) findings.push(`${relative}: internal-facing term: ${term}`);
  }

  const sentences = text.split(/(?<=[.!?])\s+/).map((s) => s.trim()).filter((s) => s.length >= 55);
  for (const sentence of sentences) {
    const key = sentence.toLowerCase().replace(/[^a-z0-9 ]+/g, ' ').replace(/\s+/g, ' ').trim();
    if (!key) continue;
    const owners = sentenceOwners.get(key) ?? [];
    owners.push(relative);
    sentenceOwners.set(key, owners);
  }
}

for (const [sentence, owners] of sentenceOwners) {
  if (new Set(owners).size > 1) findings.push(`repeated main-content sentence across pages: ${owners.join(', ')}`);
}

assert.deepEqual(findings, [], findings.join('\n'));
console.log(`✓ public copy audit passed for ${PUBLIC_PAGES.length} pages`);
