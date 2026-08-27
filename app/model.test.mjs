import test from 'node:test';
import assert from 'node:assert/strict';
import { createProject, applyIteration, runEvidenceChecks, publishProject } from './model.js';

test('creates a complete local-service project in draft state', () => {
  const project = createProject();
  assert.equal(project.status, 'draft');
  assert.equal(project.business.name, 'Northshore Landscapes');
  assert.equal(project.primaryAction, 'Request a quote');
  assert.ok(project.design.intent.includes('trustworthy'));
});

test('applies a plain-language iteration without exposing design controls', () => {
  const project = createProject();
  const result = applyIteration(project, 'Make it feel more premium and less corporate');
  assert.equal(result.project.iterations.length, 1);
  assert.match(result.project.design.direction, /premium/i);
  assert.match(result.iteration.summary, /premium/i);
});

test('evidence checks produce a deterministic verified result', () => {
  const project = createProject();
  const evidence = runEvidenceChecks(project);
  assert.equal(evidence.overall, 'verified');
  assert.equal(evidence.checks.length, 7);
  assert.ok(evidence.checks.every((check) => check.status === 'pass'));
});

test('publication is opt-in and carries provenance and evidence', () => {
  const project = createProject();
  assert.throws(() => publishProject(project, false), /opt-in/i);
  const resource = publishProject(project, true);
  assert.equal(resource.status, 'verified');
  assert.equal(resource.license, 'ByJTT Resource License');
  assert.equal(resource.provenance.source, 'ByJTT Design Studio vertical slice');
  assert.equal(resource.evidence.overall, 'verified');
});
