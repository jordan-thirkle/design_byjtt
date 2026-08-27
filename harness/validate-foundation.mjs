import { access, readFile, readdir } from 'node:fs/promises';
import { dirname, extname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';

const root = fileURLToPath(new URL('../', import.meta.url));
const readJson = async (path) => JSON.parse(await readFile(join(root, path), 'utf8'));
const ajv = new Ajv2020({allErrors: true, strict: true});
addFormats(ajv);
let failed = false;

const pairs = [
  ['evidence record', 'schemas/v0.1/evidence-record.schema.json', 'examples/v0.1/evidence-record.json'],
  ['design decision record', 'schemas/v0.1/design-decision-record.schema.json', 'examples/v0.1/design-decision-record.json'],
  ['design contract', 'schemas/v0.1/design-contract.schema.json', 'examples/v0.1/design-contract.json'],
  ['design context package', 'schemas/v0.1/design-context-package.schema.json', 'examples/v0.1/design-context-package.json'],
  ['Gauntlet profile', 'schemas/v0.1/gauntlet-profile.schema.json', 'gauntlet/v0.1/default.profile.json']
];

for (const [label, schemaPath, examplePath] of pairs) {
  const validate = ajv.compile(await readJson(schemaPath));
  if (!validate(await readJson(examplePath))) {
    failed = true;
    console.error(`${label} failed schema validation`, validate.errors);
  } else console.log(`✓ ${label} validates`);
}

const catalog = await readJson('benchmarks/catalog/v0.1.json');
const ids = catalog.benchmarks.map(({id}) => id);
if (ids.length !== 14 || new Set(ids).size !== 14) {
  failed = true;
  console.error('benchmark catalog must contain 14 unique canonical definitions');
} else console.log('✓ benchmark catalog contains 14 unique definitions');

const expected = ['INTENT', 'SLOP', 'DS', 'ROUNDTRIP', 'STATE', 'CONTENT', 'I18N', 'A11Y', 'RESP', 'REGRESS', 'PROD', 'COST', 'WHY', 'UNKNOWN'].map((name) => `BJT-${name}-01`);
const missingBenchmarks = expected.filter((id) => !ids.includes(id));
if (missingBenchmarks.length) {
  failed = true;
  console.error(`benchmark catalog is missing: ${missingBenchmarks.join(', ')}`);
}

const profile = await readJson('gauntlet/v0.1/default.profile.json');
const unknownProfileChecks = profile.checks.map(({benchmarkId}) => benchmarkId).filter((id) => !ids.includes(id));
if (unknownProfileChecks.length) {
  failed = true;
  console.error(`Gauntlet references unknown benchmarks: ${unknownProfileChecks.join(', ')}`);
} else console.log('✓ Gauntlet references canonical benchmark IDs');

const observatory = await readJson('observatory/2026-seed.json');
const unknownObservatoryChecks = observatory.signals.flatMap(({benchmarks}) => benchmarks).filter((id) => !ids.includes(id));
if (unknownObservatoryChecks.length) {
  failed = true;
  console.error(`Observatory references unknown benchmarks: ${[...new Set(unknownObservatoryChecks)].join(', ')}`);
} else console.log(`✓ Observatory maps ${observatory.signals.length} pain signals to canonical benchmarks`);

const tokenDocument = await readJson('tokens/v0.1/byjtt.tokens.json');
if (!tokenDocument.$schema?.includes('design-tokens') || tokenDocument.color?.$type !== 'color' || tokenDocument.dimension?.$type !== 'dimension') {
  failed = true;
  console.error('DTCG token baseline is missing its format marker or typed groups');
} else console.log('✓ DTCG 2025.10 token baseline has typed groups and format marker');

const walk = async (directory) => {
  const entries = await readdir(directory, {withFileTypes: true});
  return (await Promise.all(entries.map(async (entry) => entry.isDirectory() && entry.name !== '.git' && entry.name !== 'node_modules'
    ? walk(join(directory, entry.name))
    : [join(directory, entry.name)]))).flat();
};

const markdownFiles = (await walk(root)).filter((path) => extname(path) === '.md');
const linkPattern = /\[[^\]]*\]\(([^)]+)\)/g;
let checkedLinks = 0;
for (const path of markdownFiles) {
  const body = await readFile(path, 'utf8');
  for (const match of body.matchAll(linkPattern)) {
    const target = match[1].split('#')[0];
    if (!target || /^(?:https?:|mailto:|chatgpt-)/.test(target)) continue;
    checkedLinks += 1;
    try { await access(resolve(dirname(path), decodeURIComponent(target))); }
    catch {
      failed = true;
      console.error(`broken local link in ${path.slice(root.length + 1)}: ${match[1]}`);
    }
  }
}
if (!failed) console.log(`✓ ${checkedLinks} local documentation links resolve`);
if (failed) process.exitCode = 1;
