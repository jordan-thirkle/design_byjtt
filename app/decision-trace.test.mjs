import test from 'node:test';
import assert from 'node:assert/strict';
import { createProject } from './model.js';
import { applyInstruction, nextDecisionId } from './decision-trace.js';

test('numbers decisions as stable BDR identifiers', () => {
  assert.equal(nextDecisionId([]), 'BDR-0001');
  assert.equal(nextDecisionId([{ id: 'BDR-0001' }, { id: 'BDR-0007' }]), 'BDR-0008');
});

test('records an immutable before/after decision for an accepted instruction', () => {
  const project = createProject();
  const { project: next, decision } = applyInstruction(project, 'Make it more premium and mobile clear');
  assert.equal(decision.id, 'BDR-0001');
  assert.match(decision.instruction, /premium/i);
  assert.ok(decision.affectedPaths.includes('/design/direction'));
  assert.ok(decision.before);
  assert.ok(decision.after);
  assert.equal(next.decisions.length, 1);
  assert.deepEqual(project.decisions ?? [], []);
});

test('empty instructions do not create a decision', () => {
  const project = createProject();
  const result = applyInstruction(project, '   ');
  assert.equal(result.decision, null);
  assert.equal(result.project, project);
});
