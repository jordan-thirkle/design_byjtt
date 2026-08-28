import test from 'node:test';
import assert from 'node:assert/strict';
import { createProject } from './model.js';
import { getSpecimenContent } from './specimen.js';

test('local-service specimen contains semantic conversion content', () => {
  const content = getSpecimenContent(createProject());
  assert.equal(content.brand, 'Northshore Landscapes');
  assert.equal(content.primaryAction, 'Request a quote');
  assert.equal(content.services.length, 3);
  assert.ok(content.proof.length >= 3);
});

test('premium iteration changes specimen direction without changing business goal', () => {
  const project = createProject();
  project.design.direction = 'More premium and editorial.';
  const content = getSpecimenContent(project);
  assert.match(content.title, /considered/i);
  assert.equal(content.primaryAction, 'Request a quote');
});
