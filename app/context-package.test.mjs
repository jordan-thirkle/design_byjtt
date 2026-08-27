import test from 'node:test';
import assert from 'node:assert/strict';
import { createProject } from './model.js';
import { compileContextPackage } from './context-package.js';

test('compiles a provider-neutral context package from the canonical contract', () => {
  const project = createProject();
  project.decisions = [{ id: 'BDR-0001', summary: 'raised the visual tone toward premium editorial design' }];
  const pkg = compileContextPackage(project);
  assert.equal(pkg.hardConstraints[0].instruction.length > 0, true);
  assert.equal(pkg.sources.decisions[0], 'BDR-0001');
  assert.equal(pkg.target.kind, 'agent');
  assert.equal(pkg.target.name, 'ByJTT Design Studio');
  assert.equal(pkg.mode, 'guided');
  assert.match(pkg.integrity.compilerVersion, /^0\.1\./);
  assert.match(pkg.integrity.sourceDigest, /^sha256:[a-f0-9]{64}$/);
});
