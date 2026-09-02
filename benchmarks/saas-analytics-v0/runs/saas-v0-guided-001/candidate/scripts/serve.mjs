import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize, resolve } from 'node:path';

const root = resolve(process.argv[2] || '.');
const port = Number(process.argv[3] || process.env.PORT || 5173);
const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8'
};

const server = createServer(async (request, response) => {
  try {
    const url = new URL(request.url, `http://${request.headers.host}`);
    let pathname = normalize(decodeURIComponent(url.pathname));
    if (pathname === '/') pathname = '/index.html';
    const file = resolve(join(root, pathname));
    if (!file.startsWith(root)) throw new Error('Invalid path');
    const info = await stat(file);
    const body = await readFile(info.isDirectory() ? join(file, 'index.html') : file);
    response.writeHead(200, { 'content-type': types[extname(file)] || 'application/octet-stream' });
    response.end(body);
  } catch {
    const body = await readFile(join(root, 'index.html'));
    response.writeHead(200, { 'content-type': types['.html'] });
    response.end(body);
  }
});

server.listen(port, '127.0.0.1', () => {
  console.log(`Analytics workspace running at http://127.0.0.1:${port}`);
});
