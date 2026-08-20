import { spawn } from 'node:child_process';

const args = process.argv.slice(2);
let targetUrl = process.env.BENCHMARK_TARGET_URL || null;

for (let index = 0; index < args.length; index += 1) {
  if (args[index] === '--url') {
    targetUrl = args[index + 1] || null;
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
const executable = process.platform === 'win32' ? 'npx.cmd' : 'npx';
const outputDir = process.env.BENCHMARK_CANDIDATE_OUTPUT_DIR || (smokeMode ? 'test-results-candidate-smoke' : 'test-results-candidate');
const reportDir = process.env.BENCHMARK_CANDIDATE_REPORT_DIR || (smokeMode ? 'playwright-report-candidate-smoke' : 'playwright-report-candidate');
const env = {
  ...process.env,
  BENCHMARK_CANDIDATE_SMOKE: smokeMode ? '1' : '',
  PLAYWRIGHT_HTML_OUTPUT_DIR: reportDir
};

if (targetUrl) env.BENCHMARK_TARGET_URL = targetUrl;
else delete env.BENCHMARK_TARGET_URL;

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
