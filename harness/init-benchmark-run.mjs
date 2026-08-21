import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const benchmarkRoot = new URL('../benchmarks/saas-analytics-v0/', import.meta.url);
const runsRoot = new URL('runs/', benchmarkRoot);
const args = process.argv.slice(2);
const options = new Map();

for (let index = 0; index < args.length; index += 2) {
  const key = args[index];
  const value = args[index + 1];
  if (!key?.startsWith('--') || value === undefined) {
    throw new Error('Arguments must be supplied as --key value pairs');
  }
  options.set(key.slice(2), value);
}

const required = ['run-id', 'candidate-id', 'role', 'source-commit', 'max-attempts', 'active-minutes'];
for (const key of required) {
  if (!options.get(key)) throw new Error(`Missing required argument --${key}`);
}

const runId = options.get('run-id');
const candidateId = options.get('candidate-id');
const workflowRole = options.get('role');
const sourceCommitSha = options.get('source-commit');
const maxMaterialAttempts = Number(options.get('max-attempts'));
const activeMinutesBudget = Number(options.get('active-minutes'));

if (!/^[A-Za-z0-9][A-Za-z0-9._-]{0,79}$/.test(runId)) throw new Error('Invalid run ID');
if (!/^candidate-[a-z0-9][a-z0-9-]{0,39}$/.test(candidateId)) throw new Error('Invalid candidate ID');
if (!['baseline', 'byjtt-guided'].includes(workflowRole)) throw new Error('Role must be baseline or byjtt-guided');
if (!/^[a-f0-9]{40}$/.test(sourceCommitSha)) throw new Error('Source commit must be a 40-character lowercase Git SHA');
if (!Number.isInteger(maxMaterialAttempts) || maxMaterialAttempts < 1) throw new Error('Max attempts must be a positive integer');
if (!Number.isFinite(activeMinutesBudget) || activeMinutesBudget <= 0) throw new Error('Active minutes must be greater than zero');

const brief = JSON.parse(await readFile(new URL('brief.json', benchmarkRoot), 'utf8'));
const contextManifestBytes = await readFile(new URL('context-sources.json', benchmarkRoot));
const sourceManifestDigestSha256 = createHash('sha256').update(contextManifestBytes).digest('hex');
const bundleId = workflowRole === 'baseline' ? 'baseline-v0' : 'byjtt-guided-v0';

const runDir = join(fileURLToPath(runsRoot), runId);
try {
  await mkdir(runDir);
} catch (error) {
  if (error?.code === 'EEXIST') throw new Error(`Run record already exists: ${runId}`);
  throw error;
}

const run = {
  benchmarkId: brief.id,
  benchmarkVersion: brief.version,
  runId,
  candidateId,
  workflowRole,
  status: 'registered',
  context: {
    bundleId,
    bundleDigestSha256: null,
    sourceManifestDigestSha256,
    sourceCommitSha
  },
  generator: {
    provider: null,
    tool: null,
    model: null,
    versionOrDate: null,
    freshContextConfirmed: false
  },
  controls: {
    maxMaterialAttempts,
    activeMinutesBudget,
    humanVisualEditingAllowed: false,
    paidExternalServicesApproved: false
  },
  timing: {
    startedAt: null,
    endedAt: null,
    activeMinutes: null
  },
  attempts: [],
  interventions: [],
  cost: {
    amount: null,
    currency: null,
    credits: null,
    source: 'pending'
  },
  candidate: {
    sourceCommitSha: null,
    sourceRef: null,
    runtimeUrl: null,
    startCommand: null,
    implementationDigestSha256: null
  },
  evaluation: {
    evaluatorRunId: null,
    evidenceRoot: null,
    evidenceDigestSha256: null,
    scorePath: null,
    objectiveGatePassed: null
  },
  confounds: [],
  notes: {
    operationalFailures: [],
    discardedWork: [],
    uncertainty: [],
    lessons: []
  }
};

await writeFile(join(runDir, 'run.json'), `${JSON.stringify(run, null, 2)}\n`, { flag: 'wx' });
console.log(`✓ registered ${runId} as ${workflowRole} (${candidateId})`);
console.log(`  context manifest sha256: ${sourceManifestDigestSha256}`);
console.log(`  record: benchmarks/saas-analytics-v0/runs/${runId}/run.json`);
