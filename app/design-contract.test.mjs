import test from 'node:test';
import assert from 'node:assert/strict';
import { createProject } from './model.js';
import { createDesignContract, validateDesignContract } from './design-contract.js';

test('compiles a project into the complete v0.1 design contract shape', () => {
  const contract = createDesignContract(createProject());
  assert.equal(contract.schemaVersion, '0.1.0');
  assert.equal(contract.lifecycle, 'experimental');
  for (const key of ['intent', 'audiences', 'mode', 'constraints', 'creativeTerritory', 'tokens', 'components', 'states', 'accessibility', 'responsive', 'content', 'decisions', 'unresolvedQuestions']) {
    assert.ok(key in contract, `${key} is missing`);
  }
  assert.equal(contract.intent.primaryOutcome, 'Request a quote');
  assert.ok(contract.constraints.length > 0);
  assert.ok(contract.creativeTerritory.length > 0);
  assert.ok(contract.states.includes('populated'));
  assert.equal(validateDesignContract(contract).valid, true);
});

test('rejects a compiled contract when a required field is removed', () => {
  const contract = createDesignContract(createProject());
  const result = validateDesignContract({ ...contract, intent: undefined });
  assert.equal(result.valid, false);
  assert.ok(result.errors.length > 0);
});
