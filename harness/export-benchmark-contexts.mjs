import { createHash } from 'node:crypto';
import { cp, lstat, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outputRoot = join(repoRoot, 'benchmark-contexts');
const sourceManifestPath = join(repoRoot, 'benchmarks/saas-analytics-v0/context-sources.json');
const sourceManifest = JSON.parse(await readFile(sourceManifestPath, 'utf8'));

const sha256 = (buffer) => createHash('sha256').update(buffer).digest('hex');
const resolveInsideRepo = (relativePath) => {
  const resolved = resolve(repoRoot, relativePath);
  if (resolved !== repoRoot && !resolved.startsWith(`${repoRoot}${sep}`)) {
    throw new Error(`Context source escapes repository root: ${relativePath}`);
  }
  return resolved;
};

if (!sourceManifest.benchmarkId || !sourceManifest.benchmarkVersion || !Array.isArray(sourceManifest.bundles)) {
  throw new Error('Context source manifest is missing required benchmark metadata or bundles');
}

const bundleIds = new Set();
for (const bundle of sourceManifest.bundles) {
  if (!bundle.id || !Array.isArray(bundle.files) || bundle.files.length === 0) {
    throw new Error('Each context bundle requires an id and at least one file');
  }
  if (bundleIds.has(bundle.id)) throw new Error(`Duplicate context bundle id: ${bundle.id}`);
  bundleIds.add(bundle.id);

  const targets = new Set();
  const sources = new Set();
  for (const file of bundle.files) {
    if (!file.source || !file.target || !/^[a-f0-9]{64}$/.test(file.sha256 ?? '')) {
      throw new Error(`Invalid frozen context file declaration in ${bundle.id}`);
    }
    if (targets.has(file.target)) throw new Error(`Duplicate context target in ${bundle.id}: ${file.target}`);
    if (sources.has(file.source)) throw new Error(`Duplicate context source in ${bundle.id}: ${file.source}`);
    targets.add(file.target);
    sources.add(file.source);
  }
}

await rm(outputRoot, { recursive: true, force: true });
await mkdir(outputRoot, { recursive: true });

for (const bundle of sourceManifest.bundles) {
  const bundleRoot = join(outputRoot, bundle.id);
  const manifestFiles = [];

  for (const file of bundle.files) {
    const absoluteSource = resolveInsideRepo(file.source);
    const sourceStat = await lstat(absoluteSource);
    if (!sourceStat.isFile() || sourceStat.isSymbolicLink()) {
      throw new Error(`Context source must be a regular non-symlink file: ${file.source}`);
    }

    const absoluteTarget = resolve(bundleRoot, file.target);
    if (absoluteTarget !== bundleRoot && !absoluteTarget.startsWith(`${bundleRoot}${sep}`)) {
      throw new Error(`Context target escapes bundle root: ${file.target}`);
    }

    const sourceContent = await readFile(absoluteSource);
    const actualHash = sha256(sourceContent);
    if (actualHash !== file.sha256) {
      throw new Error(`Frozen context source drifted: ${file.source}\nexpected ${file.sha256}\nactual   ${actualHash}`);
    }

    await mkdir(dirname(absoluteTarget), { recursive: true });
    await cp(absoluteSource, absoluteTarget);
    const copiedContent = await readFile(absoluteTarget);
    const copiedHash = sha256(copiedContent);
    if (copiedHash !== file.sha256) {
      throw new Error(`Copied context payload hash mismatch: ${file.target}`);
    }

    manifestFiles.push({ source: file.source, target: file.target, sha256: file.sha256 });
  }

  const manifest = {
    bundleId: bundle.id,
    benchmarkId: sourceManifest.benchmarkId,
    benchmarkVersion: sourceManifest.benchmarkVersion,
    policy: sourceManifest.policy,
    files: manifestFiles
  };

  await writeFile(join(bundleRoot, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
  console.log(`✓ exported ${bundle.id} (${manifestFiles.length} frozen source files)`);
}
