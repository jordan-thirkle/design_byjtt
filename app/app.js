import { publishToLibrary } from './library.js';
import { createStudioState, submitInstruction, setPreviewMode, selectPanel } from './studio-state.js';
import { renderSpecimen } from './specimen.js';
import { collectBrowserEvidence } from './evidence.js';

let state = createStudioState();
const $ = (selector) => document.querySelector(selector);

function render() {
  $('#project-name').textContent = state.project.business.name;
  renderSpecimen(state.project, $('#preview'));
  const browserEvidence = collectBrowserEvidence(document, window);
  state = { ...state, project: { ...state.project, evidence: browserEvidence } };
  window.__BYJTT_STATE__ = state;
  $('#status-text').textContent = state.published ? 'Published' : state.project.evidence.overall === 'verified' ? 'Verified' : 'Tested';
  $('#preview').className = `preview-frame ${state.preview}`;
  document.querySelectorAll('[data-preview]').forEach((button) => button.classList.toggle('active', button.dataset.preview === state.preview));
  document.querySelectorAll('[data-panel]').forEach((button) => button.classList.toggle('active', button.dataset.panel === state.panel));
  $('#studio-panel').classList.toggle('hidden', state.panel !== 'studio');
  $('#evidence-panel').classList.toggle('hidden', state.panel !== 'evidence');
  $('#library-panel').classList.toggle('hidden', state.panel !== 'library');
  $('#panel-title').textContent = state.panel === 'studio' ? 'Direct the design' : state.panel === 'evidence' ? 'Show your work' : 'Resource Library';
  $('#library-empty').classList.toggle('hidden', Boolean(state.published));
  $('#resource-card').classList.toggle('hidden', !state.published);
  $('#published-count').textContent = state.published ? '1' : '0';
  renderConversation();
  renderEvidence();
  updatePublishButton();
  document.querySelectorAll('.mobile-tabs button').forEach((button) => button.classList.toggle('active', button.dataset.panel === state.panel));
}

function renderConversation() {
  $('#conversation').innerHTML = state.messages.slice(1).map((message) => `<div class="message ${message.role}">${escapeHtml(message.text)}</div>`).join('');
}

function renderEvidence() {
  const checks = state.project.evidence?.checks ?? [];
  const passed = checks.filter((check) => check.status === 'pass').length;
  $('#check-list').innerHTML = checks.map((check) => `<div class="check"><span class="check-mark">${check.status === 'pass' ? '✓' : check.status === 'fail' ? '!' : '—'}</span><div><strong>${check.label}</strong><p>${escapeHtml(check.summary)}</p></div></div>`).join('');
  const summary = $('#evidence-panel .evidence-summary');
  if (summary) summary.querySelector('span').textContent = `${passed} of ${checks.length} checks passed`;
  if (summary) summary.querySelector('strong').textContent = state.project.evidence?.overall === 'verified' ? 'Verified' : 'Tested';
}

function updatePublishButton() {
  const consent = $('#publish-consent').checked;
  $('#publish-button').disabled = !(consent && state.project.evidence?.overall === 'verified');
}

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, (char) => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', "'":'&#39;', '"':'&quot;' })[char]);
}

function send(instruction) {
  state = submitInstruction(state, instruction);
  $('#prompt').value = '';
  render();
}

document.querySelectorAll('[data-preview]').forEach((button) => button.addEventListener('click', () => {
  state = setPreviewMode(state, button.dataset.preview);
  render();
}));

document.querySelectorAll('[data-panel]').forEach((button) => button.addEventListener('click', () => {
  state = selectPanel(state, button.dataset.panel);
  if (window.matchMedia('(max-width: 980px)').matches && button.dataset.panel !== 'studio') $('.right-panel').classList.add('mobile-open');
  else $('.right-panel').classList.remove('mobile-open');
  render();
}));

document.querySelectorAll('[data-prompt]').forEach((button) => button.addEventListener('click', () => send(button.dataset.prompt)));

$('#prompt-form').addEventListener('submit', (event) => {
  event.preventDefault();
  send($('#prompt').value);
});

$('#why-button').addEventListener('click', () => {
  state = { ...state, messages: [...state.messages, { role: 'assistant', text: 'The direction prioritises trust and conversion first: one clear quote action, local proof, readable hierarchy and enough visual character to avoid looking like a generic trades template.' }] };
  render();
});

$('#publish-consent').addEventListener('change', updatePublishButton);

$('#publish-button').addEventListener('click', async () => {
  if (!$('#publish-consent').checked || state.project.evidence?.overall !== 'verified') return;
  $('#publish-button').disabled = true;
  $('#publish-button').textContent = 'Compiling artefact…';
  try {
    const published = await publishToLibrary(state.project);
    state = { ...state, published };
    $('#publish-button').textContent = 'Published to Library ✓';
    render();
  } catch (error) {
    $('#publish-button').disabled = false;
    $('#publish-button').textContent = 'Publish to Library';
    throw error;
  }
});

$('#resource-details').addEventListener('click', () => { state = selectPanel(state, 'evidence'); render(); });
$('#remix-button').addEventListener('click', () => { state = selectPanel(state, 'studio'); $('.right-panel').classList.remove('mobile-open'); render(); $('#prompt').focus(); });
$('#inspect-button').addEventListener('click', () => { state = selectPanel(state, 'evidence'); render(); });
$('#panel-close').addEventListener('click', () => { $('.right-panel').classList.remove('mobile-open'); state = selectPanel(state, 'studio'); render(); });

render();
