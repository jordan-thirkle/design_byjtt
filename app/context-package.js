import { createDesignContract } from './design-contract.js';

async function digest(value) {
  const bytes = new TextEncoder().encode(JSON.stringify(value));
  const hash = await globalThis.crypto.subtle.digest('SHA-256', bytes);
  return [...new Uint8Array(hash)].map((byte) => byte.toString(16).padStart(2, '0')).join('');
}

export async function compileContextPackage(project) {
  const contract = createDesignContract(project);
  const sourceDigest = await digest(contract);
  const now = new Date().toISOString();
  return {
    schemaVersion: '0.1.0',
    id: `bjt-dcp:${project.id}`,
    version: '0.1.0',
    generatedAt: now,
    target: { kind: 'agent', name: 'ByJTT Design Studio', adapter: null },
    mode: 'guided',
    sources: {
      evidence: (project.evidence?.checks ?? []).map((check) => check.id),
      decisions: (project.decisions ?? []).map((decision) => decision.id),
      contracts: [contract.id],
      patterns: contract.components.map((component) => component.id),
      benchmarks: [],
    },
    hardConstraints: contract.constraints.map((item) => ({ id: item.id, instruction: item.statement, verification: item.rationale })),
    creativeTerritory: contract.creativeTerritory.map((item) => ({ id: item.id, opportunity: item.statement, boundaries: [item.rationale] })),
    unresolvedQuestions: contract.unresolvedQuestions.map((item) => ({ ...item, owner: 'human' })),
    validationTargets: ['BJT-PRODUCT-01', 'BJT-UX-01', 'BJT-A11Y-01', 'BJT-RESPONSIVE-01', 'BJT-CONTENT-01', 'BJT-ENGINEERING-01', 'BJT-PROVENANCE-01'],
    integrity: { sourceDigest: `sha256:${sourceDigest}`, compilerVersion: '0.1.0' },
  };
}
