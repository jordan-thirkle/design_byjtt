function clone(value) {
  return typeof structuredClone === 'function' ? structuredClone(value) : JSON.parse(JSON.stringify(value));
}

export function nextDecisionId(decisions = []) {
  const max = decisions.reduce((highest, decision) => {
    const match = /^BDR-(\d{4})$/.exec(decision?.id ?? '');
    return match ? Math.max(highest, Number(match[1])) : highest;
  }, 0);
  return `BDR-${String(max + 1).padStart(4, '0')}`;
}

export function applyInstruction(project, instruction) {
  const text = String(instruction || '').trim();
  if (!text) return { project, iteration: null, decision: null };

  const next = clone(project);
  const lower = text.toLowerCase();
  const changes = [];
  const before = {};
  const after = {};
  const affectedPaths = [];

  const setDirection = (direction) => {
    before['/design/direction'] = next.design.direction;
    next.design.direction = direction;
    after['/design/direction'] = next.design.direction;
    affectedPaths.push('/design/direction');
  };

  if (lower.includes('premium')) {
    setDirection('More premium and editorial, with stronger typography, calmer spacing and fewer decorative elements.');
    changes.push('raised the visual tone toward premium editorial design');
  }
  if (lower.includes('corporate')) {
    setDirection('Premium and editorial, with warmer language, softer composition and a more human local-business feel.');
    changes.push('reduced corporate visual cues');
  }
  if (lower.includes('mobile')) {
    before['/responsive'] = next.responsive ?? null;
    next.responsive = [...(next.responsive ?? []), 'Prioritise mobile-first hierarchy and thumb-friendly actions.'];
    after['/responsive'] = next.responsive;
    affectedPaths.push('/responsive');
    changes.push('prioritised mobile-first hierarchy and thumb-friendly actions');
  }
  if (lower.includes('clear') || lower.includes('purpose')) {
    before['/primaryAction'] = next.primaryAction;
    after['/primaryAction'] = next.primaryAction;
    affectedPaths.push('/primaryAction');
    changes.push('strengthened the primary action and value proposition');
  }
  if (!changes.length) {
    changes.push('refined the design direction while preserving the project goal');
    before['/design/direction'] = next.design.direction;
    after['/design/direction'] = next.design.direction;
    affectedPaths.push('/design/direction');
  }

  const summary = `ByJTT ${changes.join('; ')}.`;
  const decision = {
    id: nextDecisionId(next.decisions ?? []),
    instruction: text,
    summary,
    affectedPaths: [...new Set(affectedPaths)],
    before,
    after,
    rationale: 'Accepted through the Studio conversational direction loop while preserving the canonical project goal.',
    timestamp: new Date().toISOString(),
    provenance: { source: 'studio', method: 'conversational-iteration' },
  };
  const iteration = { id: `iteration-${(next.iterations ?? []).length + 1}`, instruction: text, summary, decisionId: decision.id };
  next.iterations = [...(next.iterations ?? []), iteration];
  next.decisions = [...(next.decisions ?? []), decision];
  return { project: next, iteration, decision };
}
