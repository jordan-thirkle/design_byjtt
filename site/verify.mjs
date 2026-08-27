import { access, readFile } from 'node:fs/promises';
import { join } from 'node:path';

const root = new URL('.', import.meta.url);
const required = ['index.html', 'styles.css', 'app.js'];
for (const file of required) await access(new URL(file, root));

const html = await readFile(new URL('index.html', root), 'utf8');
const app = await readFile(new URL('app.js', root), 'utf8');
const requiredCopy = ['Build something', 'Start with the product, not the prompt', 'What are you building?', 'Who is it for?', 'What must users be able to do?', 'Check a design'];
const missingCopy = requiredCopy.filter((text) => !html.includes(text));
const requiredHooks = ['brief-form', 'brief-result', 'check-form', 'copy-brief', 'reset-brief'];
const missingHooks = requiredHooks.filter((hook) => !html.includes(`id="${hook}"`) && !app.includes(`#${hook}`));
if (missingCopy.length || missingHooks.length) {
  throw new Error(`Public site check failed: missing copy=${missingCopy.join(', ')} hooks=${missingHooks.join(', ')}`);
}
console.log(`✓ public site contains ${required.length} required files, core copy and interactive hooks`);
