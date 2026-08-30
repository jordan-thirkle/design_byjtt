import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const SKIP_DIRS = new Set(['.git', '.next', 'node_modules', '.vercel', 'dist', 'coverage']);
const TEXT_EXTENSIONS = new Set(['.html', '.htm', '.md', '.mdx', '.txt', '.json', '.js', '.mjs', '.css']);

const RETIRED_PHRASES = [
  'Independent studio. JTT.',
  'Make the useful thing.',
  'Games with a point of view.',
  'Small teams. Stronger worlds.',
  'Evidence-Driven AI Product Development',
];

const GENERIC_AI_PHRASES = [
  'at the intersection of',
  'where X meets Y',
  'crafting digital experiences',
  'innovative solutions',
  'redefining the future',
  'reimagining the future',
  'shaping the future',
];

const files = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (!SKIP_DIRS.has(entry.name)) walk(path.join(dir, entry.name));
      continue;
    }
    const ext = path.extname(entry.name).toLowerCase();
    if (TEXT_EXTENSIONS.has(ext)) files.push(path.join(dir, entry.name));
  }
}
walk(ROOT);

const findings = [];
for (const file of files) {
  const relative = path.relative(ROOT, file).replaceAll(path.sep, '/');
  const text = fs.readFileSync(file, 'utf8');
  for (const phrase of RETIRED_PHRASES) {
    if (text.toLowerCase().includes(phrase.toLowerCase())) {
      findings.push({ severity: 'error', rule: 'retired-phrase', file: relative, phrase });
    }
  }
  for (const phrase of GENERIC_AI_PHRASES) {
    if (text.toLowerCase().includes(phrase.toLowerCase())) {
      findings.push({ severity: 'warning', rule: 'generic-ai-phrase', file: relative, phrase });
    }
  }

  const emDashCount = [...text].filter((char) => char === '—').length;
  if (emDashCount >= 2) {
    findings.push({
      severity: 'warning',
      rule: 'repeated-em-dash',
      file: relative,
      phrase: `em dash count: ${emDashCount}`,
    });
  }
}

const errors = findings.filter((finding) => finding.severity === 'error');
const warnings = findings.filter((finding) => finding.severity === 'warning');

for (const finding of findings) {
  console.log(`${finding.severity.toUpperCase()} ${finding.rule} ${finding.file}: ${finding.phrase}`);
}

console.log(`Copy lint: ${errors.length} error(s), ${warnings.length} warning(s).`);
if (errors.length > 0) process.exit(1);
