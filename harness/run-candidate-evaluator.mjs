import { spawn } from 'node:child_process';
import { join } from 'node:path';

const args = process.argv.slice(2);
let targetUrl = process.env.BENCHMARK_TARGET_URL || null;
let runId = process.env.BENCHMARK_RUN_ID || null;

for (let index = 0; index < args.length; index += 1) {
  if (args[index] === '--url') {
    targetUrl = args[index + 1] || null;
    index += 1;
    continue;
  }
  if (args[index] === '--run-id') {
    runId = args[index + 1] || null;
    index += 1;
  }
}

if (targetUrl) {
  const parsed = new URL(targetUrl);
  if (!['http:', 'https:'].includes(parsed.protocol)) {
    throw new Error('Candidate target URL must use http or https');
  }
  targetUrl = parsed.toString().replace(/\/$/, '');
}

const smokeMode = !targetUrl;
if (!smokeMode) {
  if (!runId) throw new Error('Real candidate evaluation requires --run-id or BENCHMARK_RUN_ID');
  if (!/^[A-Za-z0-9][A-Za-z0-9._-]{0,79}$/.test(runId)) {
    throw new Error('Run ID must be 1-80 characters using letters, numbers, dot, underscore or hyphen');
  }
}

const executable = process.platform === 'win32' ? 'npx.cmd' : 'npx';
const artifactRoot = process.env.BENCHMARK_CANDIDATE_ARTIFACT_ROOT || 'benchmark-run-evidence';
const outputDir = smokeMode ? 'test-results-candidate-smoke' : join(artifactRoot, runId, 'test-results');
const reportDir = smokeMode ? 'playwright-report-candidate-smoke' : join(artifactRoot, runId, 'playwright-report');
const env = {
  ...process.env,
  BENCHMARK_CANDIDATE_SMOKE: smokeMode ? '1' : '',
  PLAYWRIGHT_HTML_OUTPUT_DIR: reportDir
};

if (targetUrl) {
  env.BENCHMARK_TARGET_URL = targetUrl;
  env.BENCHMARK_RUN_ID = runId;
} else {
  delete env.BENCHMARK_TARGET_URL;
  delete env.BENCHMARK_RUN_ID;
}

const child = spawn(
  executable,
  ['playwright', 'test', 'harness/tests/candidate-runtime.spec.mjs', `--output=${outputDir}`],
  { env, stdio: 'inherit' }
);

child.on('error', (error) => {
  console.error(error);
  process.exitCode = 1;
});

child.on('exit', (code, signal) => {
  if (signal) {
    console.error(`Candidate evaluator terminated by signal ${signal}`);
    process.exitCode = 1;
    return;
  }
  process.exitCode = code ?? 1;
});
