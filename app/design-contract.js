import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const here = path.dirname(fileURLToPath(import.meta.url));
const schemaPath = path.join(here, '..', 'schemas', 'v0.1', 'design-contract.schema.json');
const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
const ajv = new Ajv({ allErrors: true, strict: false });
addFormats(ajv);
const validate = ajv.compile(schema);

const rule = (id, statement, rationale, evidence = []) => ({ id, statement, rationale, ...(evidence.length ? { evidence } : {}) });

export function createDesignContract(project) {
  const design = project.design ?? {};
  const decisions = project.decisions ?? [];
  return {
    schemaVersion: '0.1.0',
    id: `byjtt://product/${project.id}`,
    version: '0.1.0',
    lifecycle: project.status === 'verified' ? 'verified' : 'experimental',
    intent: {
      problem: `Visitors need to trust ${project.business.name} and understand how to start a project.`,
      primaryOutcome: project.primaryAction,
      nonGoals: ['generic template presentation', 'multiple competing primary actions'],
    },
    audiences: [project.business.audience],
    mode: 'both',
    constraints: [
      rule('C-001', 'Keep one clear primary visitor outcome.', 'The service journey should lead to a quote request.'),
      rule('C-002', 'Preserve a local, human tone.', 'The experience must not read as a generic corporate template.'),
    ],
    creativeTerritory: [
      rule('CT-001', design.direction, 'The visual direction translates the stated intent into a recognisable territory.'),
      rule('CT-002', 'Use editorial hierarchy, calm spacing and restrained decoration.', 'These choices support premium trust without reducing approachability.'),
    ],
    tokens: { format: 'DTCG-2025.10', source: 'ByJTT Design Studio specimen tokens' },
    components: [
      { id: 'hero', version: '0.1.0', rules: ['One dominant heading and primary action.', 'Supporting proof stays subordinate.'] },
      { id: 'service-list', version: '0.1.0', rules: ['Services remain scannable.', 'Each service exposes a clear next step.'] },
    ],
    states: ['populated', 'loading', 'empty', 'partial', 'error'],
    accessibility: [
      'Use semantic landmarks and one page-level h1.',
      'All actionable controls must be keyboard focusable.',
      'Visible focus states must remain distinguishable.',
      'Decorative imagery must not carry essential meaning without an accessible alternative.',
    ],
    responsive: [
      'Desktop: two-column hero with navigation and primary action visible.',
      'Tablet: preserve hierarchy while reducing horizontal density.',
      'Mobile: stack content, keep primary action thumb-friendly, and prevent horizontal overflow.',
    ],
    content: [
      'Support realistic long business names and service descriptions.',
      'Do not depend on fixed-width text containers for primary content.',
      'Keep action labels understandable without surrounding visual context.',
    ],
    decisions: decisions.map((decision) => decision.id),
    unresolvedQuestions: [
      { id: 'UQ-001', question: 'Which real portfolio examples should replace the illustrative specimen artwork?', blocking: false },
    ],
  };
}

export function validateDesignContract(contract) {
  const valid = validate(contract);
  return { valid, errors: validate.errors ? [...validate.errors] : [] };
}
