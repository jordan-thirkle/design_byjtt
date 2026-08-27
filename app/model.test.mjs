import test from 'node:test';
import assert from 'node:assert/strict';
import { createProject, applyIteration, runEvidenceChecks, publishProject } from './model.js';

function verifiedEvidence() {
  const ids = ['product', 'ux', 'accessibility', 'responsive', 'content', 'engineering', 'provenance'];
  return { overall: 'verified', checks: ids.map((id) => ({ id, label: id, status: 'pass', assertion: true, summary: 'Executable test passed.', observations: [] })) };
}

test('creates a complete local-service project in draft state', () => {
  const project = createProject();
  assert.equal(project.status, 'draft');
  assert.equal(project.business.name, 'Northshore Landscapes');
  assert.equal(project.primaryAction, 'Request a quote');
  assert.ok(project.design.intent.includes('trustworthy'));
  assert.deepEqual(project.decisions, []);
});

test('applies a plain-language iteration and records a traceable decision', () => {
  const project = createProject();
  const result = applyIteration(project, 'Make it feel more premium and less corporate');
  assert.equal(result.project.iterations.length, 1);
  assert.equal(result.project.decisions.length, 1);
  assert.match(result.project.design.direction, /premium/i);
  assert.match(result.iteration.summary, /premium/i);
  assert.equal(result.decision.id, 'BDR-0001');
  assert.ok(result.decision.affectedPaths.includes('/design/direction'));
});

test('evidence checks do not claim verification before browser-backed checks run', () => {
  const evidence = runEvidenceChecks(createProject());
  assert.equal(evidence.overall, 'tested');
  assert.equal(evidence.checks.length, 7);
  assert.ok(evidence.checks.some((check) => check.status === 'not_run'));
});

test('publication is opt-in, verified-only, and carries the complete project artefact', () => {
  const project = createProject();
  assert.throws(() => publishProject(project, false, verifiedEvidence()), /opt-in/i);
  assert.throws(() => publishProject(project, true, runEvidenceChecks(project)), /verification/i);
  const resource = publishProject(project, true, verifiedEvidence());
  assert.equal(resource.status, 'verified');
  assert.equal(resource.license, 'ByJTT Resource License');
  assert.equal(resource.provenance.source, 'ByJTT Design Studio');
  assert.equal(resource.evidence.overall, 'verified');
  assert.equal(resource.designContract.intent.primaryOutcome, 'Request a quote');
  assert.ok(Array.isArray(resource.decisions));
  assert.ok(resource.contextPackage);
  assert.ok(resource.specimen);
});
