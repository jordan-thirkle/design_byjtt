import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import assert from 'node:assert/strict';
import Ajv from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';
import { createProject } from './model.js';
import { compileContextPackage } from './context-package.js';

const here = path.dirname(fileURLToPath(import.meta.url));
const schema = JSON.parse(fs.readFileSync(path.join(here, '..', 'schemas', 'v0.1', 'design-context-package.schema.json'), 'utf8'));
const ajv = new Ajv({ allErrors: true, strict: false });
addFormats(ajv);
const validate = ajv.compile(schema);

test('compiles a provider-neutral context package from the canonical contract', () => {
  const project = createProject();
  project.decisions = [{ id: 'BDR-0001', summary: 'raised the visual tone toward premium editorial design' }];
  const pkg = compileContextPackage(project);
  assert.equal(validate(pkg), true);
  assert.equal(pkg.hardConstraints[0].instruction.length > 0, true);
  assert.equal(pkg.sources.decisions[0], 'BDR-0001');
  assert.equal(pkg.target.kind, 'agent');
  assert.equal(pkg.target.name, 'ByJTT Design Studio');
  assert.equal(pkg.mode, 'guided');
  assert.match(pkg.integrity.compilerVersion, /^0\.1\./);
  assert.match(pkg.integrity.sourceDigest, /^sha256:[a-f0-9]{64}$/);
});
