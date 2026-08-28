import test from 'node:test';
import assert from 'node:assert/strict';
import { createProject } from './model.js';
import { createEvidenceRecord, runDeterministicEvidence } from './evidence.js';

test('evidence records require executable assertion results for pass', () => {
  const record = createEvidenceRecord('product', { status: 'pass', assertion: true, summary: 'Primary action exists.' });
  assert.equal(record.status, 'pass');
  assert.equal(record.assertion, true);
  assert.ok(record.timestamp);
});

test('evidence cannot fabricate a pass without an assertion', () => {
  assert.throws(() => createEvidenceRecord('product', { status: 'pass', assertion: false, summary: 'Looks good.' }), /assertion/i);
});

test('deterministic evidence reports a failed product contract honestly', () => {
  const project = createProject();
  project.primaryAction = '';
  const evidence = runDeterministicEvidence(project);
  const product = evidence.checks.find((check) => check.id === 'product');
  assert.equal(product.status, 'fail');
  assert.equal(product.assertion, false);
  assert.equal(evidence.overall, 'tested');
});
