import { access, readFile, readdir } from 'node:fs/promises';
import { isAbsolute, join, resolve, sep } from 'node:path';
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
const briefValid = reportValidation('brief.json', ajv.compile(briefSchema), brief);

const fixtureSchema = await readJson('fixtures/analytics.schema.json');
const fixture = await readJson('fixtures/analytics.json');
const fixtureValid = reportValidation('fixtures/analytics.json', ajv.compile(fixtureSchema), fixture);

const validateTrendSemantics = () => {
  if (!fixtureValid) return;
  const days = fixture.trend.map((point) => point.day);
  if (new Set(days).size !== days.length) {
    failed = true;
    console.error('fixtures/analytics.json trend contains duplicate day values');
  }

  for (let index = 1; index < days.length; index += 1) {
    if (days[index] <= days[index - 1]) {
      failed = true;
      console.error(`fixtures/analytics.json trend is not strictly chronological at ${days[index - 1]} -> ${days[index]}`);
      break;
    }
  }

  if (!failed) console.log('✓ analytics trend contains 30 unique chronological days');
};

validateTrendSemantics();

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

const viewportKey = ({ name, width, height }) => `${name}:${width}x${height}`;
const requiredViewportKeys = briefValid ? new Set(brief.viewports.map(viewportKey)) : new Set();
const requiredStates = briefValid ? brief.requiredStates : [];

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

const validateEvidenceLocations = async (score, runName) => {
  const runDir = resolve(runsDirPath, runName);
  for (const item of score.evidence) {
    if (item.location.kind !== 'local') continue;
    const localPath = item.location.path;
    if (isAbsolute(localPath)) {
      failed = true;
      console.error(`${runName}/score.json evidence ${item.id} must use a run-relative local path`);
      continue;
    }

    const resolvedPath = resolve(runDir, localPath);
    if (resolvedPath !== runDir && !resolvedPath.startsWith(`${runDir}${sep}`)) {
      failed = true;
      console.error(`${runName}/score.json evidence ${item.id} escapes the run directory`);
      continue;
    }

    try {
      await access(resolvedPath);
    } catch {
      failed = true;
      console.error(`${runName}/score.json evidence ${item.id} points to missing local path: ${localPath}`);
    }
  }
};

const validateEvidenceCoverage = (score, runName) => {
  if (!briefValid) return;
  const screenshotEvidence = score.evidence.filter((item) => item.type === 'state-screenshot' || item.type === 'viewport-screenshot');

  for (const state of requiredStates) {
    for (const requiredViewport of requiredViewportKeys) {
      const covered = screenshotEvidence.some((item) => item.state === state && item.viewport && viewportKey(item.viewport) === requiredViewport);
      if (!covered) {
        failed = true;
        console.error(`${runName}/score.json is missing screenshot evidence for ${state} at ${requiredViewport}`);
      }
    }
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
    await validateEvidenceLocations(score, entry.name);
    validateEvidenceCoverage(score, entry.name);
  } catch (error) {
    if (error?.code !== 'ENOENT') throw error;
  }
}

console.log(scoreCount ? `✓ validated ${scoreCount} benchmark score file(s)` : 'ℹ no executed benchmark score files yet; none fabricated');

if (failed) process.exitCode = 1;
