import test from 'node:test';
import assert from 'node:assert/strict';

const source = await import('./copy-lint.mjs?test=1');

test('retired brand phrases remain errors', () => {
  const result = source.analyseText('Make the useful thing.');
  assert.equal(result.some((f) => f.severity === 'error' && f.rule === 'retired-phrase'), true);
});

test('generic phrase is a warning, not an automatic failure', () => {
  const result = source.analyseText('This sits at the intersection of design and code.');
  assert.equal(result.some((f) => f.severity === 'warning' && f.rule === 'generic-ai-phrase'), true);
  assert.equal(result.every((f) => f.severity !== 'error'), true);
});

test('single em dash is allowed', () => {
  const result = source.analyseText('A deliberate sentence — with a single dash.');
  assert.equal(result.some((f) => f.rule === 'repeated-em-dash'), false);
});

test('repeated em dashes are warned', () => {
  const result = source.analyseText('First — clause. Second — clause.');
  assert.equal(result.some((f) => f.rule === 'repeated-em-dash'), true);
});
