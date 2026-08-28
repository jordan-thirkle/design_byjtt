import { createProject, applyIteration, runEvidenceChecks } from './model.js';

export function createStudioState() {
  const project = createProject();
  return {
    project: { ...project, evidence: runEvidenceChecks(project) },
    panel: 'studio',
    preview: 'desktop',
    evidenceVisible: true,
    published: null,
    messages: [
      { role: 'assistant', text: "I've started with a local landscaping business whose visitors need to trust the work and request a quote. I've chosen a warm, editorial direction rather than a generic trades-site template." },
    ],
  };
}

export function submitInstruction(state, instruction) {
  const result = applyIteration(state.project, instruction);
  if (!result.iteration) return state;
  const project = { ...result.project, evidence: runEvidenceChecks(result.project) };
  return {
    ...state,
    project,
    messages: [
      ...state.messages,
      { role: 'user', text: instruction.trim() },
      { role: 'assistant', text: result.iteration.summary + ' The preview is updated; you can keep directing it in plain English.' },
    ],
  };
}

export function setPreviewMode(state, preview) {
  if (!['desktop', 'tablet', 'mobile'].includes(preview)) return state;
  return { ...state, preview };
}

export function selectPanel(state, panel) {
  if (!['studio', 'library', 'evidence'].includes(panel)) return state;
  return { ...state, panel, evidenceVisible: panel !== 'studio' ? true : state.evidenceVisible };
}
