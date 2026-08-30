import { readFile, writeFile } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { renderPublicFooter, renderPublicHeader } from '../site-shell.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
export const routes = [
  ['/', 'index.html'],
  ['/standard/', 'standard.html'],
  ['/research/', 'research/index.html'],
  ['/contracts/', 'contracts/index.html'],
  ['/agents/', 'agents/index.html'],
  ['/library/', 'library/index.html'],
  ['/benchmarks/', 'benchmarks/index.html'],
  ['/docs/', 'docs/index.html']
];

function replaceSingle(source, pattern, replacement, label, file) {
  const matches = source.match(pattern);
  if (!matches || matches.length !== 1) throw new Error(`Expected exactly one ${label} in ${file}; found ${matches?.length ?? 0}`);
  return source.replace(pattern, replacement);
}

export function applyShellToHtml(html, route, relativePath) {
  const headerPattern = /(?:<a class="skip"[\s\S]*?<\/header>|<header class="site-header">[\s\S]*?<\/header>)/i;
  const footerPattern = /<footer class="footer">[\s\S]*?<\/footer>/i;
  let output = replaceSingle(html, headerPattern, renderPublicHeader(route), 'public header', relativePath);
  output = replaceSingle(output, footerPattern, renderPublicFooter(), 'public footer', relativePath);
  if (!/<main[^>]*\bid=["']main["']/i.test(output)) {
    output = replaceSingle(output, /<main(?![^>]*\bid=)[^>]*>/i, (match) => match.replace('<main', '<main id="main"'), 'main landmark', relativePath);
  }
  return output.replace(/<!-- ByJTT canonical public shell: [^>]+ -->\s*/i, '').replace(/<body>/i, `<body>\n<!-- ByJTT canonical public shell: ${route} -->`);
}

export async function applyShell({write = true} = {}) {
  for (const [route, relativePath] of routes) {
    const file = join(root, relativePath);
    const source = await readFile(file, 'utf8');
    const output = applyShellToHtml(source, route, relativePath);
    if (write) await writeFile(file, output);
  }
}

export async function checkShellIdempotence() {
  for (const [route, relativePath] of routes) {
    const file = join(root, relativePath);
    const source = await readFile(file, 'utf8');
    const once = applyShellToHtml(source, route, relativePath);
    const twice = applyShellToHtml(once, route, relativePath);
    if (once !== twice) throw new Error(`canonical shell is not idempotent for ${relativePath}`);
  }
}

const invokedDirectly = process.argv[1] && relative(process.cwd(), process.argv[1]) === relative(process.cwd(), fileURLToPath(import.meta.url));
if (invokedDirectly) {
  await checkShellIdempotence();
  await applyShell();
  console.log(`✓ canonical public shell applied to ${routes.length} routes`);
}
