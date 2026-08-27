const REQUIRED_CHECKS = [
  ['product', 'Product fit'],
  ['ux', 'UX hierarchy'],
  ['accessibility', 'Accessibility'],
  ['responsive', 'Responsive'],
  ['content', 'Content resilience'],
  ['engineering', 'Engineering'],
  ['provenance', 'Provenance'],
];

export function createEvidenceRecord(id, result) {
  if (result.status === 'pass' && result.assertion !== true) {
    throw new Error(`Evidence check ${id} cannot pass without a successful executable assertion.`);
  }
  if (!['pass', 'fail', 'not_run'].includes(result.status)) throw new Error(`Invalid evidence status for ${id}.`);
  return {
    id,
    status: result.status,
    assertion: result.assertion === true,
    summary: result.summary,
    observations: result.observations ?? [],
    timestamp: result.timestamp ?? new Date().toISOString(),
    execution: result.execution ?? { source: 'deterministic' },
  };
}

export function runDeterministicEvidence(project) {
  const checks = REQUIRED_CHECKS.map(([id, label]) => {
    if (id === 'product') {
      const ok = Boolean(project.business?.name && project.primaryAction);
      return { ...createEvidenceRecord(id, { status: ok ? 'pass' : 'fail', assertion: ok, summary: ok ? 'Business identity and primary action are present.' : 'A business identity or primary action is missing.' }), label };
    }
    if (id === 'engineering') {
      const ok = Boolean(project.id && project.design?.direction);
      return { ...createEvidenceRecord(id, { status: ok ? 'pass' : 'fail', assertion: ok, summary: ok ? 'Project state is deterministic and structured.' : 'Project state is incomplete.' }), label };
    }
    if (id === 'provenance') {
      const ok = Boolean(project.id);
      return { ...createEvidenceRecord(id, { status: ok ? 'pass' : 'fail', assertion: ok, summary: ok ? 'Project identity is available for provenance.' : 'Project identity is missing.' }), label };
    }
    return { ...createEvidenceRecord(id, { status: 'not_run', assertion: false, summary: 'Requires browser-backed execution.' }), label };
  });
  return { overall: checks.every((check) => check.status === 'pass') ? 'verified' : 'tested', checks };
}

export function collectBrowserEvidence(document, window) {
  const results = [];
  const run = (id, label, assertion, summary, observations = []) => {
    const ok = Boolean(assertion);
    results.push({ ...createEvidenceRecord(id, { status: ok ? 'pass' : 'fail', assertion: ok, summary, observations, execution: { source: 'browser', viewport: `${window.innerWidth}x${window.innerHeight}` } }), label });
  };

  const primary = document.querySelector('.specimen-primary');
  run('product', 'Product fit', Boolean(primary?.textContent?.trim()), 'Primary visitor action is rendered in the live specimen.');
  const main = document.querySelector('main');
  const h1 = document.querySelector('h1');
  run('ux', 'UX hierarchy', Boolean(main && h1 && document.querySelector('nav')), 'Semantic main content, navigation and a page heading are present.');
  const actionable = [...document.querySelectorAll('a,button,input,textarea,select')];
  const keyboardReady = actionable.every((element) => element.disabled || element.tabIndex >= 0);
  run('accessibility', 'Accessibility', keyboardReady, 'Rendered actionable controls expose keyboard focusability.');
  run('responsive', 'Responsive', document.documentElement.scrollWidth <= window.innerWidth, 'The rendered specimen does not overflow its viewport.');
  const serviceCopy = [...document.querySelectorAll('.service-list p')];
  run('content', 'Content resilience', serviceCopy.length >= 3 && serviceCopy.every((node) => node.textContent.trim().length > 20), 'Service content renders with realistic descriptive copy.');
  run('engineering', 'Engineering', Boolean(document.querySelector('.site-specimen')), 'The specimen is rendered from structured project state.');
  run('provenance', 'Provenance', Boolean(document.querySelector('.specimen-footer')), 'The rendered specimen exposes its ByJTT provenance marker.');
  return { overall: results.every((check) => check.status === 'pass') ? 'verified' : 'tested', checks: results };
}
