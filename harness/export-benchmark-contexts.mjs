import { createHash } from 'node:crypto';
import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outputRoot = join(repoRoot, 'benchmark-contexts');

const bundles = [
  {
    id: 'baseline-v0',
    files: [
      ['benchmarks/saas-analytics-v0/prompts/baseline-v0.md', 'PROMPT.md'],
      ['benchmarks/saas-analytics-v0/brief.json', 'brief.json'],
      ['benchmarks/saas-analytics-v0/fixtures/analytics.json', 'fixtures/analytics.json']
    ]
  },
  {
    id: 'byjtt-guided-v0',
    files: [
      ['benchmarks/saas-analytics-v0/prompts/byjtt-guided-v0.md', 'PROMPT.md'],
      ['benchmarks/saas-analytics-v0/brief.json', 'brief.json'],
      ['benchmarks/saas-analytics-v0/fixtures/analytics.json', 'fixtures/analytics.json'],
      ['PRODUCT.md', 'PRODUCT.md'],
      ['DESIGN.md', 'DESIGN.md'],
      ['docs/REQUIREMENTS.md', 'docs/REQUIREMENTS.md'],
      ['docs/COMPETITIVE-MAP.md', 'docs/COMPETITIVE-MAP.md'],
      ['docs/research/AI-SLOP-AND-USER-PAIN.md', 'docs/research/AI-SLOP-AND-USER-PAIN.md'],
      ['docs/decisions/0002-best-available-system-first.md', 'docs/decisions/0002-best-available-system-first.md'],
      ['benchmarks/saas-analytics-v0/gauntlet.md', 'gauntlet.md']
    ]
  }
];

const sha256 = (buffer) => createHash('sha256').update(buffer).digest('hex');

await rm(outputRoot, { recursive: true, force: true });
await mkdir(outputRoot, { recursive: true });

for (const bundle of bundles) {
  const bundleRoot = join(outputRoot, bundle.id);
  const manifestFiles = [];

  for (const [sourcePath, targetPath] of bundle.files) {
    const absoluteSource = join(repoRoot, sourcePath);
    const absoluteTarget = join(bundleRoot, targetPath);
    await mkdir(dirname(absoluteTarget), { recursive: true });
    await cp(absoluteSource, absoluteTarget);
    const content = await readFile(absoluteTarget);
    manifestFiles.push({ source: sourcePath, target: targetPath, sha256: sha256(content) });
  }

  const manifest = {
    bundleId: bundle.id,
    benchmarkId: 'saas-analytics-v0',
    benchmarkVersion: '0.1.0',
    policy: {
      externalPaidCreditsAllowed: false,
      hiddenRepositoryContextAllowed: false
    },
    files: manifestFiles
  };

  await writeFile(join(bundleRoot, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
  console.log(`✓ exported ${bundle.id} (${manifestFiles.length} source files)`);
}
