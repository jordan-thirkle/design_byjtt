import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const port = Number(process.env.PORT || 4174);
const routeFiles = new Map([
  ['/standard/', 'standard.html']
]);
const contentTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8'
};

createServer(async (request, response) => {
  try {
    const pathname = new URL(request.url ?? '/', `http://${request.headers.host}`).pathname;
    const requested = routeFiles.get(pathname) ?? (pathname === '/' ? '/index.html' : pathname);
    const relative = normalize(requested).replace(/^([/\\])+/, '');
    const candidate = join(root, relative);

    if (!candidate.startsWith(root)) {
      response.writeHead(403);
      response.end('Forbidden');
      return;
    }

    const info = await stat(candidate);
    const filePath = info.isDirectory() ? join(candidate, 'index.html') : candidate;
    const body = await readFile(filePath);
    response.writeHead(200, {
      'content-type': contentTypes[extname(filePath)] ?? 'application/octet-stream',
      'cache-control': 'no-store'
    });
    response.end(body);
  } catch {
    response.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
    response.end('Not found');
  }
}).listen(port, '127.0.0.1', () => {
  console.log(`ByJTT public-site test server: http://127.0.0.1:${port}`);
});
