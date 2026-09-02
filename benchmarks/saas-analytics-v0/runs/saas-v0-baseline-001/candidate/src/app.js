const app = document.querySelector("#app");
const allowedStates = new Set(["loading", "empty", "partial", "error"]);
const params = new URLSearchParams(window.location.search);
const state = allowedStates.has(params.get("state")) ? params.get("state") : "populated";

const currency = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 });
const currencyExact = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" });
const number = new Intl.NumberFormat("en-GB");

let selectedSegment = "channel";
let selectedAnomalyId = null;
let data = null;

async function init() {
  renderShell();

  if (state === "loading") {
    renderLoading();
    return;
  }

  try {
    const response = await fetch("./fixtures/analytics.json");
    if (!response.ok) throw new Error(`Fixture load failed: ${response.status}`);
    data = await response.json();
  } catch (error) {
    renderError("Fixture data could not be loaded.", error.message);
    return;
  }

  if (state === "error") {
    renderError("Analytics processing failed.", "The local fixture was reached, but the workspace is displaying the required error state.");
    return;
  }

  if (state === "empty") {
    renderEmpty();
    return;
  }

  if (state === "partial") {
    const partial = structuredClone(data);
    partial.headline.averageOrderValue.changePercent = null;
    partial.segments.device = null;
    partial.anomalies = [];
    partial.recentEvents = partial.recentEvents.slice(0, 1);
    renderDashboard(partial, { partial: true });
    return;
  }

  selectedAnomalyId = data.anomalies[0]?.id ?? null;
  renderDashboard(data, { partial: false });
}

function renderShell() {
  app.innerHTML = `
    <header class="topbar">
      <div>
        <p class="eyebrow">Operations</p>
        <h1>Business health</h1>
      </div>
      <nav class="state-nav" aria-label="Required benchmark states">
        ${stateLink("Populated", "./", state === "populated")}
        ${stateLink("Loading", "?state=loading", state === "loading")}
        ${stateLink("Empty", "?state=empty", state === "empty")}
        ${stateLink("Partial", "?state=partial", state === "partial")}
        ${stateLink("Error", "?state=error", state === "error")}
      </nav>
    </header>
    <main id="main" tabindex="-1"></main>
  `;
}

function stateLink(label, href, active) {
  return `<a class="${active ? "active" : ""}" ${active ? 'aria-current="page"' : ""} href="${href}">${label}</a>`;
}

function renderLoading() {
  main().innerHTML = `
    <section class="status-panel" role="status" aria-live="polite">
      <div class="spinner" aria-hidden="true"></div>
      <div>
        <h2>Loading analytics</h2>
        <p>Revenue, segment and anomaly data are being prepared from the local fixture.</p>
      </div>
    </section>
    ${skeletonGrid()}
  `;
}

function renderEmpty() {
  main().innerHTML = `
    <section class="status-panel">
      <div class="status-mark">0</div>
      <div>
        <h2>No analytics for this period</h2>
        <p>The workspace is available, but the selected comparison window contains no revenue, orders, segment data or anomalies.</p>
      </div>
    </section>
    <section class="empty-grid" aria-label="Empty metrics">
      ${["Revenue", "Orders", "Conversion rate", "Average order value"].map((label) => `<div><span>${label}</span><strong>No data</strong></div>`).join("")}
    </section>
  `;
}

function renderError(title, detail) {
  main().innerHTML = `
    <section class="status-panel error">
      <div class="status-mark">!</div>
      <div>
        <h2>${escapeHtml(title)}</h2>
        <p>${escapeHtml(detail)}</p>
        <a class="button" href="./">Return to populated workspace</a>
      </div>
    </section>
  `;
}

function renderDashboard(model, options) {
  const anomaly = model.anomalies.find((item) => item.id === selectedAnomalyId) ?? model.anomalies[0];
  const comparison = options.partial ? "Some comparison and device segment data is delayed." : `${model.period.label} compared with ${model.period.comparisonLabel}.`;
  const topChange = getTopChange(model);

  main().innerHTML = `
    <section class="summary-band" aria-labelledby="summary-title">
      <div class="summary-copy">
        <p class="eyebrow">${escapeHtml(model.period.label)}</p>
        <h2 id="summary-title">${topChange.direction === "down" ? "Performance is declining" : "Performance is improving"}</h2>
        <p>${escapeHtml(comparison)} The strongest signal is ${escapeHtml(topChange.label)} at ${formatChange(topChange.changePercent, true)}.</p>
      </div>
      <div class="metric-strip" aria-label="Headline metrics">
        ${metric("Revenue", currencyExact.format(model.headline.revenue.value), model.headline.revenue.changePercent)}
        ${metric("Orders", number.format(model.headline.orders.value), model.headline.orders.changePercent)}
        ${metric("Conversion", `${model.headline.conversionRate.value}%`, model.headline.conversionRate.changePercent)}
        ${metric("Avg order", currencyExact.format(model.headline.averageOrderValue.value), model.headline.averageOrderValue.changePercent)}
      </div>
    </section>
    <section class="workspace-grid">
      <article class="trend-panel" aria-labelledby="trend-title">
        <div class="section-head">
          <div>
            <p class="eyebrow">Trend</p>
            <h2 id="trend-title">Daily revenue</h2>
          </div>
          <p class="chart-summary">${trendSummary(model.trend)}</p>
        </div>
        ${chart(model.trend)}
      </article>
      <aside class="insight-panel" aria-labelledby="anomaly-title">
        <div class="section-head compact">
          <div>
            <p class="eyebrow">Anomaly</p>
            <h2 id="anomaly-title">Likely cause</h2>
          </div>
        </div>
        ${anomaly ? anomalyView(anomaly, model.recentEvents) : noAnomalyView()}
      </aside>
      <article class="segments-panel" aria-labelledby="segments-title">
        <div class="section-head">
          <div>
            <p class="eyebrow">Segments</p>
            <h2 id="segments-title">Inspect source of change</h2>
          </div>
          <div class="segmented" role="tablist" aria-label="Segment type">
            ${segmentButton("channel", "Channel")}
            ${segmentButton("device", "Device")}
          </div>
        </div>
        <div id="segment-content">${segmentsView(model.segments[selectedSegment], selectedSegment)}</div>
      </article>
      <article class="events-panel" aria-labelledby="events-title">
        <div class="section-head compact">
          <div>
            <p class="eyebrow">Context</p>
            <h2 id="events-title">Recent events</h2>
          </div>
        </div>
        <ol class="events">
          ${model.recentEvents.map((event) => `<li><time datetime="${event.timestamp}">${formatDate(event.timestamp)}</time><span>${escapeHtml(event.label)}</span></li>`).join("")}
        </ol>
      </article>
    </section>
  `;

  document.querySelectorAll("[data-segment]").forEach((button) => {
    button.addEventListener("click", () => {
      selectedSegment = button.dataset.segment;
      renderDashboard(model, options);
    });
  });
}

function metric(label, value, change) {
  return `
    <div class="metric">
      <span>${label}</span>
      <strong>${value}</strong>
      <em class="${changeClass(change)}">${formatChange(change)} ${change == null ? "" : change < 0 ? "decline" : "increase"}</em>
    </div>
  `;
}

function chart(trend) {
  const width = 780;
  const height = 250;
  const pad = 18;
  const max = Math.max(...trend.map((point) => point.revenue));
  const step = (width - pad * 2) / (trend.length - 1);
  const points = trend.map((point, index) => {
    const x = pad + index * step;
    const y = height - pad - (point.revenue / max) * (height - pad * 2);
    return { ...point, x, y };
  });
  const path = points.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x.toFixed(1)} ${point.y.toFixed(1)}`).join(" ");
  const bars = points.map((point) => `<circle class="${point.revenue === 0 ? "zero" : ""}" cx="${point.x}" cy="${point.y}" r="${point.revenue === 0 ? 5 : 3}"><title>${point.day}: ${currencyExact.format(point.revenue)}</title></circle>`).join("");
  return `
    <figure class="chart">
      <svg viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="chart-title chart-desc" preserveAspectRatio="none">
        <title id="chart-title">Revenue trend for the last 30 days</title>
        <desc id="chart-desc">${trendSummary(trend)} A zero revenue day appears on 2026-08-19.</desc>
        <line x1="${pad}" y1="${height - pad}" x2="${width - pad}" y2="${height - pad}" />
        <path d="${path}" />
        ${bars}
      </svg>
      <figcaption>Daily revenue trends downward across the period, with a zero revenue day on 19 Aug 2026.</figcaption>
    </figure>
  `;
}

function anomalyView(anomaly, events) {
  return `
    <div class="anomaly-card" tabindex="0">
      <span class="severity">${escapeHtml(anomaly.severity)} severity</span>
      <h3>${escapeHtml(anomaly.title)}</h3>
      <p>${escapeHtml(anomaly.summary)}</p>
      <h4>Evidence</h4>
      <ul>${anomaly.evidence.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
      <h4>Likely cause</h4>
      <p>${escapeHtml(anomaly.likelyCause)}</p>
      <h4>Supporting context</h4>
      <ul>${events.map((event) => `<li>${formatDate(event.timestamp)}: ${escapeHtml(event.label)}</li>`).join("")}</ul>
    </div>
  `;
}

function noAnomalyView() {
  return `<div class="quiet-box"><h3>No anomalies detected</h3><p>Headline trend data is available, but there are no anomaly records for this state.</p></div>`;
}

function segmentButton(key, label) {
  const selected = selectedSegment === key;
  return `<button type="button" role="tab" aria-selected="${selected}" class="${selected ? "selected" : ""}" data-segment="${key}">${label}</button>`;
}

function segmentsView(rows, type) {
  if (!rows) {
    return `<div class="quiet-box"><h3>${type === "device" ? "Device" : "Channel"} data delayed</h3><p>This segment has not finished processing. Headline and trend data remain available.</p></div>`;
  }

  const max = Math.max(...rows.map((row) => row.revenue));
  return `
    <div class="segment-list">
      ${rows.map((row) => `
        <button class="segment-row" type="button">
          <span>
            <strong>${escapeHtml(row.name)}</strong>
            <small>${currencyExact.format(row.revenue)}${row.conversionRate ? `, ${row.conversionRate}% conversion` : ""}</small>
          </span>
          <span class="bar-track" aria-hidden="true"><span style="width: ${(row.revenue / max * 100).toFixed(1)}%"></span></span>
          <em class="${changeClass(row.changePercent)}">${formatChange(row.changePercent)} ${row.changePercent < 0 ? "decline" : "increase"}</em>
        </button>
      `).join("")}
    </div>
  `;
}

function getTopChange(model) {
  const items = [
    ["Revenue", model.headline.revenue.changePercent],
    ["Orders", model.headline.orders.changePercent],
    ["Conversion rate", model.headline.conversionRate.changePercent],
    ["Average order value", model.headline.averageOrderValue.changePercent]
  ].filter(([, value]) => value != null);
  const [label, changePercent] = items.sort((a, b) => Math.abs(b[1]) - Math.abs(a[1]))[0];
  return { label, changePercent, direction: changePercent < 0 ? "down" : "up" };
}

function trendSummary(trend) {
  const first = trend[0].revenue;
  const last = trend.at(-1).revenue;
  const change = ((last - first) / first) * 100;
  return `Revenue moved from ${currency.format(first)} to ${currency.format(last)}, a ${Math.abs(change).toFixed(1)}% ${change < 0 ? "decline" : "increase"}.`;
}

function formatChange(change, sentence = false) {
  if (change == null) return sentence ? "no comparison available" : "No comparison";
  const prefix = change > 0 ? "+" : "";
  return `${prefix}${change.toFixed(1)}%`;
}

function changeClass(change) {
  if (change == null) return "neutral";
  return change < 0 ? "negative" : "positive";
}

function formatDate(value) {
  return new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" }).format(new Date(value));
}

function skeletonGrid() {
  return `<section class="skeleton-grid" aria-hidden="true">${Array.from({ length: 6 }, () => `<div></div>`).join("")}</section>`;
}

function main() {
  return document.querySelector("#main");
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
}

init();
