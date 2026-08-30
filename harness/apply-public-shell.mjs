import { readFile, writeFile } from 'node:fs/promises';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { renderPublicFooter, renderPublicHeader } from '../site-shell.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const routes = [
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
  if (!matches || matches.length !== 1) {
    throw new Error(`Expected exactly one ${label} in ${file}; found ${matches?.length ?? 0}`);
  }
  return source.replace(pattern, replacement);
}

export async function applyShell() {
  for (const [route, relativePath] of routes) {
    const file = join(root, relativePath);
    let html = await readFile(file, 'utf8');
    html = replaceSingle(
      html,
      /(?:<a class="skip"[\s\S]*?<\/header>|<header class="site-header">[\s\S]*?<\/header>)/i,
      renderPublicHeader(route),
      'public header',
      relativePath
    );
    html = replaceSingle(html, /<footer class="footer">[\s\S]*?<\/footer>/i, renderPublicFooter(), 'public footer', relativePath);
    if (!/<main[^>]*\bid=["']main["']/i.test(html)) {
      html = replaceSingle(html, /<main(?![^>]*\bid=)[^>]*>/i, (match) => match.replace('<main', '<main id="main"'), 'main landmark', relativePath);
    }
    html = html.replace(/<!-- ByJTT canonical public shell: [^>]+ -->\n?/i, '');
    html = html.replace(/<body>/i, `<body>\n<!-- ByJTT canonical public shell: ${route} -->`);
    await writeFile(file, html);
  }
}

if (process.argv[1] && relative(process.cwd(), process.argv[1]) === relative(process.cwd(), fileURLToPath(import.meta.url))) {
  await applyShell();
  console.log(`✓ applied canonical public shell to ${routes.length} routes`);
}
