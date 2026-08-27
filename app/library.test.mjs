import test from 'node:test';
import assert from 'node:assert/strict';
import { createProject, publishProject } from './model.js';

test('published resource exposes useful discovery metadata', () => {
  const resource = publishProject(createProject(), true);
  assert.equal(resource.type, 'website');
  assert.equal(resource.category, 'local-services');
  assert.ok(resource.title.includes('Northshore'));
  assert.ok(resource.evidence.checks.length >= 7);
});

test('publication preserves generation provenance', () => {
  const resource = publishProject(createProject(), true);
  assert.equal(resource.provenance.generated, true);
  assert.equal(resource.provenance.iterationCount, 0);
});
