import { publishProject } from './model.js';

export async function publishToLibrary(project) {
  return publishProject(project, true);
}

export function librarySummary(resource) {
  return {
    title: resource.title,
    status: resource.status,
    type: resource.type,
    category: resource.category,
    checks: resource.evidence.checks.length,
    licence: resource.license,
    artefact: resource.designContract?.id ?? null,
  };
}
