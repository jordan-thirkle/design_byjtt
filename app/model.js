import { createDesignContract, isDesignContractComplete } from './design-contract.js';
import { applyInstruction } from './decision-trace.js';
import { runDeterministicEvidence } from './evidence.js';
import { compileContextPackage } from './context-package.js';
import { getSpecimenContent } from './specimen.js';

export function createProject() {
  return {
    id: 'northshore-landscapes',
    status: 'draft',
    business: {
      name: 'Northshore Landscapes',
      type: 'Local landscaping business',
      location: 'North East England',
      audience: 'Homeowners looking for reliable garden design and maintenance',
    },
    primaryAction: 'Request a quote',
    design: {
      direction: 'Warm, editorial, premium and trustworthy without feeling corporate.',
      intent: 'trustworthy, premium, local, approachable',
    },
    iterations: [],
    decisions: [],
    evidence: null,
  };
}

export function applyIteration(project, instruction) {
  return applyInstruction(project, instruction);
}

export function runEvidenceChecks(project) {
  return runDeterministicEvidence(project);
}

export async function publishProject(project, optedIn, evidence = project.evidence) {
  if (!optedIn) throw new Error('Publication requires explicit opt-in.');
  const contract = createDesignContract(project);
  if (!isDesignContractComplete(contract)) throw new Error('Project has an incomplete Design Contract.');
  if (!evidence || evidence.overall !== 'verified' || evidence.checks.some((check) => check.status !== 'pass')) {
    throw new Error('Project must pass all executable verification checks before publication.');
  }
  const contextPackage = await compileContextPackage({ ...project, evidence });
  return {
    id: project.id,
    title: `${project.business.name} — Local Service`,
    status: 'verified',
    type: 'website',
    category: 'local-services',
    license: 'ByJTT Resource License',
    publishedAt: new Date().toISOString(),
    designContract: contract,
    contextPackage,
    decisions: project.decisions ?? [],
    evidence,
    provenance: {
      source: 'ByJTT Design Studio',
      generated: true,
      method: 'deterministic-studio-compiler',
      iterationCount: project.iterations.length,
    },
    specimen: getSpecimenContent(project),
  };
}
