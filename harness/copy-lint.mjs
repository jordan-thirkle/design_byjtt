import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = process.cwd();
export const SKIP_DIRS = new Set(['.git', '.next', 'node_modules', '.vercel', 'dist', 'coverage']);
export const SKIP_FILES = new Set(['harness/copy-lint.mjs', 'harness/copy-lint.test.mjs']);
export const TEXT_EXTENSIONS = new Set(['.html', '.htm', '.md', '.mdx', '.txt', '.json', '.js', '.mjs', '.css']);

export const RETIRED_PHRASES = [
  'Independent studio. JTT.',
  'Make the useful thing.',
  'Games with a point of view.',
  'Small teams. Stronger worlds.',
  'Evidence-Driven AI Product Development',
];

export const GENERIC_AI_PHRASES = [
  'at the intersection of',
  'where X meets Y',
  'crafting digital experiences',
  'innovative solutions',
  'redefining the future',
  'reimagining the future',
  'shaping the future',
];

export function analyseText(text, file = '<text>') {
  const findings = [];
  for (const phrase of RETIRED_PHRASES) {
    if (text.toLowerCase().includes(phrase.toLowerCase())) {
      findings.push({ severity: 'error', rule: 'retired-phrase', file, phrase });
    }
  }
  for (const phrase of GENERIC_AI_PHRASES) {
    if (text.toLowerCase().includes(phrase.toLowerCase())) {
      findings.push({ severity: 'warning', rule: 'generic-ai-phrase', file, phrase });
    }
  }

  const emDashCount = [...text].filter((char) => char === '—').length;
  if (emDashCount >= 2) {
    findings.push({
      severity: 'warning',
      rule: 'repeated-em-dash',
      file,
      phrase: `em dash count: ${emDashCount}`,
    });
  }
  return findings;
}

export function collectFiles(root = ROOT) {
  const files = [];
  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.isDirectory()) {
        if (!SKIP_DIRS.has(entry.name)) walk(path.join(dir, entry.name));
        continue;
      }
      const ext = path.extname(entry.name).toLowerCase();
      const relative = path.relative(root, path.join(dir, entry.name)).replaceAll(path.sep, '/');
      if (TEXT_EXTENSIONS.has(ext) && !SKIP_FILES.has(relative)) files.push(path.join(dir, entry.name));
    }
  }
  walk(root);
  return files;
}

export function analyseFiles(root = ROOT) {
  return collectFiles(root).flatMap((file) => {
    const relative = path.relative(root, file).replaceAll(path.sep, '/');
    return analyseText(fs.readFileSync(file, 'utf8'), relative);
  });
}

export function main() {
  const findings = analyseFiles();
  const errors = findings.filter((finding) => finding.severity === 'error');
  const warnings = findings.filter((finding) => finding.severity === 'warning');
  for (const finding of findings) {
    console.log(`${finding.severity.toUpperCase()} ${finding.rule} ${finding.file}: ${finding.phrase}`);
  }
  console.log(`Copy lint: ${errors.length} error(s), ${warnings.length} warning(s).`);
  process.exitCode = errors.length > 0 ? 1 : 0;
}

const invokedDirectly = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (invokedDirectly) main();
