import test from 'node:test';
import assert from 'node:assert/strict';
import { createProject } from './model.js';
import { compileContextPackage } from './context-package.js';

test('compiles a provider-neutral context package from the canonical contract', () => {
  const project = createProject();
  project.decisions = [{ id: 'BDR-0001', summary: 'raised the visual tone toward premium editorial design' }];
  const pkg = compileContextPackage(project);
  assert.equal(pkg.contract.intent.primaryOutcome, 'Request a quote');
  assert.equal(pkg.contract.decisions[0], 'BDR-0001');
  assert.equal(pkg.provenance.source, 'ByJTT Design Studio');
  assert.equal(pkg.provenance.contractVersion, '0.1.0');
  assert.equal(pkg.provider, 'canonical');
});
