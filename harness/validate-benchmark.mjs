import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';

const benchmarkRoot = new URL('../benchmarks/saas-analytics-v0/', import.meta.url);
const readJson = async (relativePath) => JSON.parse(await readFile(new URL(relativePath, benchmarkRoot), 'utf8'));

const ajv = new Ajv2020({ allErrors: true, strict: true });
addFormats(ajv);

let failed = false;

const reportValidation = (label, validate, value) => {
  if (!validate(value)) {
    failed = true;
    console.error(`${label} failed schema validation`);
    console.error(validate.errors);
    return false;
  }
  console.log(`✓ ${label} matches its schema`);
  return true;
};

const briefSchema = await readJson('brief.schema.json');
const brief = await readJson('brief.json');
reportValidation('brief.json', ajv.compile(briefSchema), brief);

const fixtureSchema = await readJson('fixtures/analytics.schema.json');
const fixture = await readJson('fixtures/analytics.json');
reportValidation('fixtures/analytics.json', ajv.compile(fixtureSchema), fixture);

const invalidDateProbe = ajv.compile({ type: 'string', format: 'date' });
if (invalidDateProbe('2026-99-99')) {
  failed = true;
  console.error('date format validation is not rejecting invalid dates');
} else {
  console.log('✓ invalid benchmark dates are rejected');
}

const scoreSchema = await readJson('score.schema.json');
const validateScore = ajv.compile(scoreSchema);
const runsDir = new URL('runs/', benchmarkRoot);
const runsDirPath = fileURLToPath(runsDir);
const runEntries = await readdir(runsDir, { withFileTypes: true });
let scoreCount = 0;

const validateEvidenceReferences = (score, runName) => {
  const evidenceIds = score.evidence.map((item) => item.id);
  const uniqueIds = new Set(evidenceIds);
  if (uniqueIds.size !== evidenceIds.length) {
    failed = true;
    console.error(`${runName}/score.json contains duplicate evidence ids`);
  }

  const refs = Object.values(score.dimensions).flatMap((dimension) => dimension.evidenceRefs);
  const missingRefs = [...new Set(refs.filter((ref) => !uniqueIds.has(ref)))];
  if (missingRefs.length) {
    failed = true;
    console.error(`${runName}/score.json references missing evidence ids: ${missingRefs.join(', ')}`);
  }
};

for (const entry of runEntries) {
  if (!entry.isDirectory()) continue;
  const runPath = join(runsDirPath, entry.name, 'score.json');
  try {
    const score = JSON.parse(await readFile(runPath, 'utf8'));
    scoreCount += 1;
    if (!validateScore(score)) {
      failed = true;
      console.error(`${entry.name}/score.json failed schema validation`);
      console.error(validateScore.errors);
      continue;
    }
    validateEvidenceReferences(score, entry.name);
  } catch (error) {
    if (error?.code !== 'ENOENT') throw error;
  }
}

console.log(scoreCount ? `✓ validated ${scoreCount} benchmark score file(s)` : 'ℹ no executed benchmark score files yet; none fabricated');

if (failed) process.exitCode = 1;
