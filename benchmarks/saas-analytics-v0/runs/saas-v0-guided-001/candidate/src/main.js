const app = document.querySelector('#app');
const params = new URLSearchParams(window.location.search);
const state = params.get('state') || 'populated';
const validStates = new Set(['loading', 'populated', 'empty', 'partial', 'error']);
let data;

let currency;
let preciseCurrency;

const periods = [
  { id: '30', label: 'Last 30 days', comparison: 'Previous 30 days' },
  { id: '14', label: 'Last 14 days', comparison: 'Previous 14 days' },
  { id: '7', label: 'Last 7 days', comparison: 'Previous 7 days' }
];

let selectedPeriod = params.get('period') || '30';
let selectedSegment = 'channel';
let selectedAnomaly = null;

function formatMetric(key, value) {
  if (key === 'revenue' || key === 'averageOrderValue') return key === 'averageOrderValue' ? preciseCurrency.format(value) : currency.format(value);
  if (key === 'conversionRate') return `${value.toFixed(2)}%`;
  return new Intl.NumberFormat('en-GB').format(value);
}

function metricLabel(key) {
  return {
    revenue: 'Revenue',
    orders: 'Orders',
    conversionRate: 'Conversion rate',
    averageOrderValue: 'Average order value'
  }[key];
}

function changeText(change) {
  if (change === null || change === undefined) return 'No comparison available';
  const direction = change >= 0 ? 'up' : 'down';
  return `${direction} ${Math.abs(change).toFixed(1)}%`;
}

function statusFromChange(change) {
  if (change === null || change === undefined) return 'unknown';
  return change >= 0 ? 'improving' : 'declining';
}

function trendForPeriod() {
  const days = Number(selectedPeriod);
  return data.trend.slice(-days);
}

function overallStatus() {
  const revenue = data.headline.revenue.changePercent;
  const conversion = data.headline.conversionRate.changePercent;
  if (revenue < 0 && conversion < 0) return 'Performance is declining. Revenue and conversion are both below the comparison period.';
  if (revenue > 0 && conversion > 0) return 'Performance is improving. Revenue and conversion are both ahead of the comparison period.';
  return 'Performance is mixed. Review the segment and anomaly detail before acting.';
}

function updateUrl() {
  const next = new URL(window.location.href);
  if (selectedPeriod === '30') next.searchParams.delete('period');
  else next.searchParams.set('period', selectedPeriod);
  window.history.replaceState({}, '', next);
}

function renderShell(content, mode = 'populated') {
  app.innerHTML = `
    <a class="skip-link" href="#main">Skip to analytics</a>
    <header class="topbar">
      <div>
        <p class="eyebrow">Operational analytics</p>
        <h1>Business health workspace</h1>
      </div>
      <nav class="state-nav" aria-label="Required state URLs">
        <a ${mode === 'populated' ? 'aria-current="page"' : ''} href="/">Populated</a>
        <a ${mode === 'loading' ? 'aria-current="page"' : ''} href="/?state=loading">Loading</a>
        <a ${mode === 'empty' ? 'aria-current="page"' : ''} href="/?state=empty">Empty</a>
        <a ${mode === 'partial' ? 'aria-current="page"' : ''} href="/?state=partial">Partial</a>
        <a ${mode === 'error' ? 'aria-current="page"' : ''} href="/?state=error">Error</a>
      </nav>
    </header>
    <main id="main">${content}</main>
  `;
}

function renderTrend(points) {
  const width = 720;
  const height = 210;
  const max = Math.max(...points.map((p) => p.revenue), 1);
  const min = Math.min(...points.map((p) => p.revenue));
  const span = Math.max(max - min, 1);
  const path = points.map((p, i) => {
    const x = 20 + (i / Math.max(points.length - 1, 1)) * (width - 40);
    const y = 16 + ((max - p.revenue) / span) * (height - 38);
    return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
  }).join(' ');
  const zero = points.find((p) => p.revenue === 0);
  const label = `Revenue trend for ${periods.find((p) => p.id === selectedPeriod).label}: highest ${currency.format(max)}, lowest ${currency.format(min)}${zero ? `, including zero revenue on ${zero.day}` : ''}.`;
  return `
    <section class="panel trend-panel" aria-labelledby="trend-title">
      <div class="section-head">
        <div>
          <h2 id="trend-title">Revenue trend</h2>
          <p>${label}</p>
        </div>
        <strong>${currency.format(points.reduce((sum, p) => sum + p.revenue, 0))}</strong>
      </div>
      <svg class="trend" viewBox="0 0 ${width} ${height}" role="img" aria-label="${label}">
        <line x1="20" y1="${height - 22}" x2="${width - 20}" y2="${height - 22}" />
        <path d="${path}" />
        ${points.map((p, i) => {
          const x = 20 + (i / Math.max(points.length - 1, 1)) * (width - 40);
          const y = 16 + ((max - p.revenue) / span) * (height - 38);
          return `<circle class="${p.revenue === 0 ? 'zero' : ''}" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${p.revenue === 0 ? 5 : 3}"><title>${p.day}: ${preciseCurrency.format(p.revenue)}</title></circle>`;
        }).join('')}
      </svg>
    </section>
  `;
}

function renderMetrics(headline = data.headline) {
  return `<dl class="metrics">${Object.entries(headline).map(([key, metric]) => `
    <div class="metric ${statusFromChange(metric.changePercent)}">
      <dt>${metricLabel(key)}</dt>
      <dd>${formatMetric(key, metric.value)}</dd>
      <p><span>${changeText(metric.changePercent)}</span> vs comparison</p>
    </div>`).join('')}</dl>`;
}

function renderSegments(partial = false) {
  const rows = partial ? data.segments[selectedSegment].slice(0, 2) : data.segments[selectedSegment];
  return `
    <section class="panel" aria-labelledby="segments-title">
      <div class="section-head">
        <div>
          <h2 id="segments-title">Segment inspection</h2>
          <p>${partial ? 'Segment data is delayed; showing confirmed rows only.' : 'Revenue and conversion movement by business segment.'}</p>
        </div>
        <div class="segmented" role="tablist" aria-label="Segment type">
          <button role="tab" aria-selected="${selectedSegment === 'channel'}" data-segment="channel">Channel</button>
          <button role="tab" aria-selected="${selectedSegment === 'device'}" data-segment="device">Device</button>
        </div>
      </div>
      <div class="table-wrap">
        <table>
          <thead><tr><th scope="col">Segment</th><th scope="col">Revenue</th><th scope="col">Conversion</th><th scope="col">Change</th></tr></thead>
          <tbody>${rows.map((row) => `
            <tr>
              <th scope="row">${row.name}</th>
              <td>${currency.format(row.revenue)}</td>
              <td>${row.conversionRate ? `${row.conversionRate.toFixed(2)}%` : 'Not tracked'}</td>
              <td><span class="${statusFromChange(row.changePercent)}">${changeText(row.changePercent)}</span></td>
            </tr>`).join('')}</tbody>
        </table>
      </div>
    </section>
  `;
}

function renderAnomalies(anomalies = data.anomalies) {
  const selected = anomalies.find((item) => item.id === selectedAnomaly) || anomalies[0];
  if (!anomalies.length) return `<section class="panel"><h2>Anomalies</h2><p class="calm">No anomalies detected for this period.</p></section>`;
  return `
    <section class="split" aria-labelledby="anomaly-title">
      <div class="panel">
        <h2 id="anomaly-title">Anomaly queue</h2>
        <div class="anomaly-list">${anomalies.map((item) => `
          <button class="anomaly-item" data-anomaly="${item.id}" aria-pressed="${item.id === selected.id}">
            <span>${item.severity} priority</span>
            ${item.title}
          </button>`).join('')}</div>
      </div>
      <article class="panel anomaly-detail">
        <p class="eyebrow">${selected.severity} priority anomaly</p>
        <h3>${selected.title}</h3>
        <p>${selected.summary}</p>
        <h4>Supporting evidence</h4>
        <ul>${selected.evidence.map((item) => `<li>${item}</li>`).join('')}</ul>
        <h4>Likely cause</h4>
        <p>${selected.likelyCause}</p>
      </article>
    </section>
  `;
}

function renderEvents() {
  return `
    <section class="panel" aria-labelledby="events-title">
      <h2 id="events-title">Recent context</h2>
      <ol class="events">${data.recentEvents.map((event) => `
        <li><time datetime="${event.timestamp}">${new Date(event.timestamp).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</time><span>${event.type}</span>${event.label}</li>
      `).join('')}</ol>
    </section>
  `;
}

function renderWorkspace(options = {}) {
  const selected = periods.find((period) => period.id === selectedPeriod) || periods[0];
  const headline = options.missingComparison
    ? { ...data.headline, averageOrderValue: { ...data.headline.averageOrderValue, changePercent: null } }
    : data.headline;
  renderShell(`
    <section class="overview" aria-labelledby="status-title">
      <div class="status-copy">
        <p class="eyebrow">${selected.label} compared with ${selected.comparison}</p>
        <h2 id="status-title">${overallStatus()}</h2>
        <p>The largest visible risk is the Paid Social and mobile conversion drop after the checkout release.</p>
      </div>
      <form class="period-control" aria-label="Comparison period">
        <label for="period">Compare</label>
        <select id="period" name="period">
          ${periods.map((period) => `<option value="${period.id}" ${period.id === selectedPeriod ? 'selected' : ''}>${period.label}</option>`).join('')}
        </select>
      </form>
    </section>
    ${renderMetrics(headline)}
    <div class="workspace-grid">
      ${renderTrend(trendForPeriod())}
      ${renderEvents()}
    </div>
    ${renderAnomalies(options.noAnomalies ? [] : data.anomalies)}
    ${renderSegments(options.partial)}
  `);
  bindInteractions();
}

function bindInteractions() {
  document.querySelector('#period')?.addEventListener('change', (event) => {
    selectedPeriod = event.target.value;
    updateUrl();
    renderWorkspace();
  });
  document.querySelectorAll('[data-segment]').forEach((button) => {
    button.addEventListener('click', () => {
      selectedSegment = button.dataset.segment;
      renderWorkspace(state === 'partial' ? { partial: true, missingComparison: true } : {});
    });
  });
  document.querySelectorAll('[data-anomaly]').forEach((button) => {
    button.addEventListener('click', () => {
      selectedAnomaly = button.dataset.anomaly;
      renderWorkspace();
    });
  });
}

function renderMessage(mode, title, body, action = '') {
  renderShell(`
    <section class="message-state ${mode}" role="${mode === 'error' ? 'alert' : 'status'}" aria-live="polite">
      <p class="eyebrow">${mode}</p>
      <h2>${title}</h2>
      <p>${body}</p>
      ${action}
    </section>
  `, mode);
}

async function boot() {
  if (state === 'loading') {
    renderMessage('loading', 'Loading deterministic analytics', 'Revenue, segment and anomaly data is being prepared from the local fixture.', '<div class="skeleton" aria-hidden="true"></div>');
    return;
  }

  try {
    const response = await fetch('/fixtures/analytics.json');
    if (!response.ok) throw new Error(`Fixture request failed: ${response.status}`);
    data = await response.json();
    currency = new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: data.currency,
      maximumFractionDigits: 0
    });
    preciseCurrency = new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: data.currency
    });
    selectedAnomaly = data.anomalies[0]?.id || null;
  } catch (error) {
    renderMessage('error', 'Analytics could not be loaded', 'The workspace is reachable, but the deterministic fixture failed validation. Retry after checking the local data file.', '<a class="button-link" href="/">Return to populated state</a>');
    return;
  }

  if (!validStates.has(state)) {
    renderMessage('error', 'Unknown state requested', 'Use /, ?state=loading, ?state=empty, ?state=partial or ?state=error.');
  } else if (state === 'empty') {
    renderWorkspace({ noAnomalies: true });
    document.querySelector('#main').innerHTML = `
      <section class="message-state" role="status">
        <p class="eyebrow">empty</p>
        <h2>No analytics available for this period</h2>
        <p>The workspace has loaded correctly, but the selected period contains no reportable orders, revenue or anomalies.</p>
      </section>
    `;
  } else if (state === 'partial') {
    renderWorkspace({ partial: true, missingComparison: true });
  } else if (state === 'error') {
    renderMessage('error', 'Analytics could not be loaded', 'The workspace is reachable, but the deterministic fixture failed validation. Retry after checking the local data file.', '<a class="button-link" href="/">Return to populated state</a>');
  } else {
    renderWorkspace();
  }
}

boot();
