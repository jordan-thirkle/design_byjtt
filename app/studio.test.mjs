import test from 'node:test';
import assert from 'node:assert/strict';
import { createStudioState, submitInstruction, setPreviewMode, selectPanel } from './studio-state.js';

test('starts in Studio with desktop preview and evidence available', () => {
  const state = createStudioState();
  assert.equal(state.panel, 'studio');
  assert.equal(state.preview, 'desktop');
  assert.equal(state.evidenceVisible, true);
});

test('plain-language instruction updates the project and conversation', () => {
  const state = createStudioState();
  const next = submitInstruction(state, 'Make it more premium');
  assert.equal(next.project.iterations.length, 1);
  assert.equal(next.messages.at(-1).role, 'assistant');
  assert.match(next.messages.at(-1).text, /premium/i);
});

test('preview mode and panel selection are explicit state transitions', () => {
  const state = createStudioState();
  assert.equal(setPreviewMode(state, 'mobile').preview, 'mobile');
  assert.equal(selectPanel(state, 'library').panel, 'library');
});
