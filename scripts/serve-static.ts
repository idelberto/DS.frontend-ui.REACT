// Serve o out/ do build no mesmo caminho do GitHub Pages, para o smoke e o job consumidor do CI.
// O next start não funciona com output: 'export'.
import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize, sep } from 'node:path';

import { BASE_PATH } from '../src/lib/base-path.ts';

const OUT_DIR = join(import.meta.dirname, '..', 'out');
const DEFAULT_PORT = 3201;

const CONTENT_TYPES: Record<string, string> = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.woff2': 'font/woff2',
};

function findFile(requestPath: string): string | undefined {
  if (!requestPath.startsWith(BASE_PATH)) {
    return undefined;
  }
  const relativePath = decodeURIComponent(requestPath.slice(BASE_PATH.length));
  const filePath = normalize(join(OUT_DIR, relativePath));
  if (!filePath.startsWith(OUT_DIR + sep) && filePath !== OUT_DIR) {
    return undefined;
  }
  if (!existsSync(filePath)) {
    return undefined;
  }
  if (!statSync(filePath).isDirectory()) {
    return filePath;
  }
  const indexPath = join(filePath, 'index.html');
  if (!existsSync(indexPath)) {
    return undefined;
  }
  return indexPath;
}

if (!existsSync(OUT_DIR)) {
  throw new Error('Pasta out/ não encontrada: rode o npm run build antes.');
}

const port = Number(process.env['PORT'] ?? DEFAULT_PORT);

createServer((request, response) => {
  const requestPath = new URL(request.url ?? '/', 'http://localhost').pathname;
  const filePath = findFile(requestPath);
  if (filePath === undefined) {
    response.writeHead(404, { 'content-type': CONTENT_TYPES['.html'] });
    createReadStream(join(OUT_DIR, '404.html')).pipe(response);
    return;
  }
  response.writeHead(200, {
    'content-type': CONTENT_TYPES[extname(filePath)] ?? 'application/octet-stream',
  });
  createReadStream(filePath).pipe(response);
}).listen(port, () => {
  console.log(`Vitrine em http://localhost:${String(port)}${BASE_PATH}/`);
});
