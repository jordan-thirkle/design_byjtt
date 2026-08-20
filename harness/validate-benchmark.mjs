import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import Ajv2020 from 'ajv/dist/2020.js';

const benchmarkRoot = new URL('../benchmarks/saas-analytics-v0/', import.meta.url);
const readJson = async (relativePath) => JSON.parse(await readFile(new URL(relativePath, benchmarkRoot), 'utf8'));

const ajv = new Ajv2020({ allErrors: true, strict: true, validateFormats: false });

const briefSchema = await readJson('brief.schema.json');
const brief = await readJson('brief.json');
const validateBrief = ajv.compile(briefSchema);

let failed = false;
if (!validateBrief(brief)) {
  failed = true;
  console.error('brief.json failed schema validation');
  console.error(validateBrief.errors);
} else {
  console.log('✓ brief.json matches brief.schema.json');
}

const fixture = await readJson('fixtures/analytics.json');
const requiredFixtureKeys = ['summary', 'timeseries', 'channels', 'alerts'];
const missingFixtureKeys = requiredFixtureKeys.filter((key) => !(key in fixture));
if (missingFixtureKeys.length) {
  failed = true;
  console.error(`fixtures/analytics.json missing: ${missingFixtureKeys.join(', ')}`);
} else {
  console.log('✓ analytics fixture exposes the required benchmark data groups');
}

const scoreSchema = await readJson('score.schema.json');
const validateScore = ajv.compile(scoreSchema);
const runsDir = new URL('runs/', benchmarkRoot);
const runEntries = await readdir(runsDir, { withFileTypes: true });
let scoreCount = 0;

for (const entry of runEntries) {
  if (!entry.isDirectory()) continue;
  const runPath = join(new URL('.', runsDir).pathname, entry.name, 'score.json');
  try {
    const score = JSON.parse(await readFile(runPath, 'utf8'));
    scoreCount += 1;
    if (!validateScore(score)) {
      failed = true;
      console.error(`${entry.name}/score.json failed schema validation`);
      console.error(validateScore.errors);
    }
  } catch (error) {
    if (error?.code !== 'ENOENT') throw error;
  }
}

console.log(scoreCount ? `✓ validated ${scoreCount} benchmark score file(s)` : 'ℹ no executed benchmark score files yet; none fabricated');

if (failed) process.exitCode = 1;
