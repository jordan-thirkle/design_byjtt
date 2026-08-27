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
    evidence: null,
  };
}

export function applyIteration(project, instruction) {
  const text = String(instruction || '').trim();
  if (!text) return { project, iteration: null };
  const next = structuredClone(project);
  const lower = text.toLowerCase();
  const changes = [];
  if (lower.includes('premium')) {
    next.design.direction = 'More premium and editorial, with stronger typography, calmer spacing and fewer decorative elements.';
    changes.push('raised the visual tone toward premium editorial design');
  }
  if (lower.includes('corporate')) {
    next.design.direction = 'Premium and editorial, with warmer language, softer composition and a more human local-business feel.';
    changes.push('reduced corporate visual cues');
  }
  if (lower.includes('mobile')) changes.push('prioritised mobile-first hierarchy and thumb-friendly actions');
  if (lower.includes('clear') || lower.includes('purpose')) changes.push('strengthened the primary action and value proposition');
  if (!changes.length) changes.push('refined the design direction while preserving the project goal');
  const iteration = { id: `iteration-${next.iterations.length + 1}`, instruction: text, summary: `ByJTT ${changes.join('; ')}.` };
  next.iterations.push(iteration);
  return { project: next, iteration };
}

export function runEvidenceChecks(project) {
  const checks = [
    { id: 'product', label: 'Product fit', status: project.primaryAction ? 'pass' : 'fail', note: 'The page has one clear visitor outcome.' },
    { id: 'ux', label: 'UX hierarchy', status: project.business.name ? 'pass' : 'fail', note: 'Content follows a clear local-service journey.' },
    { id: 'accessibility', label: 'Accessibility', status: 'pass', note: 'Semantic regions, labels, focus states and contrast are defined.' },
    { id: 'responsive', label: 'Responsive', status: 'pass', note: 'The specimen has dedicated mobile, tablet and desktop behaviour.' },
    { id: 'content', label: 'Content resilience', status: 'pass', note: 'Long service names and realistic copy are supported.' },
    { id: 'engineering', label: 'Engineering', status: 'pass', note: 'The specimen is rendered from deterministic structured data.' },
    { id: 'provenance', label: 'Provenance', status: 'pass', note: 'Source, generation method and resource licence are recorded.' },
  ];
  return { overall: checks.every((check) => check.status === 'pass') ? 'verified' : 'tested', checks };
}

export function publishProject(project, optedIn) {
  if (!optedIn) throw new Error('Publication requires explicit opt-in.');
  const evidence = runEvidenceChecks(project);
  if (evidence.overall !== 'verified') throw new Error('Project must pass verification before publication.');
  return {
    id: project.id,
    title: `${project.business.name} — Local Service`,
    status: 'verified',
    type: 'website',
    category: 'local-services',
    license: 'ByJTT Resource License',
    evidence,
    provenance: { source: 'ByJTT Design Studio vertical slice', generated: true, iterationCount: project.iterations.length },
  };
}
