import test from 'node:test';
import assert from 'node:assert/strict';
import { createProject, publishProject, runEvidenceChecks } from './model.js';

function verifiedEvidence() {
  return { overall: 'verified', checks: ['product', 'ux', 'accessibility', 'responsive', 'content', 'engineering', 'provenance'].map((id) => ({ id, label: id, status: 'pass', assertion: true, summary: 'Executable test passed.', observations: [] })) };
}

test('published resource exposes useful discovery metadata and complete artefact', () => {
  const resource = publishProject(createProject(), true, verifiedEvidence());
  assert.equal(resource.type, 'website');
  assert.equal(resource.category, 'local-services');
  assert.ok(resource.title.includes('Northshore'));
  assert.ok(resource.evidence.checks.length >= 7);
  assert.equal(resource.designContract.schemaVersion, '0.1.0');
  assert.ok(resource.contextPackage);
  assert.ok(resource.specimen);
});

test('publication preserves generation provenance and rejects unverified evidence', () => {
  const project = createProject();
  assert.throws(() => publishProject(project, true, runEvidenceChecks(project)), /verification/i);
  const resource = publishProject(project, true, verifiedEvidence());
  assert.equal(resource.provenance.generated, true);
  assert.equal(resource.provenance.iterationCount, 0);
});
