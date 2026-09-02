export const PUBLIC_SHELL = {
  brand: {label: 'By JTT Design', href: '/', ariaLabel: 'By JTT Design home'},
  primaryNavigation: [
    {label: 'Studio', href: '/studio'},
    {label: 'Standard', href: '/standard/'},
    {label: 'Library', href: '/library/'}
  ],
  secondaryNavigation: [
    {label: 'Research', href: '/research/'},
    {label: 'Contracts', href: '/contracts/'},
    {label: 'Agents', href: '/agents/'},
    {label: 'Benchmarks', href: '/benchmarks/'},
    {label: 'Documentation', href: '/docs/'}
  ],
  primaryAction: {label: 'Open Studio', href: '/studio'},
  footer: {
    groups: [
      {
        label: 'Product',
        links: [
          {label: 'Studio', href: '/studio'},
          {label: 'Standard', href: '/standard/'},
          {label: 'Library', href: '/library/'}
        ]
      },
      {
        label: 'Learn',
        links: [
          {label: 'Research', href: '/research/'},
          {label: 'Contracts', href: '/contracts/'},
          {label: 'Benchmarks', href: '/benchmarks/'},
          {label: 'Documentation', href: '/docs/'}
        ]
      },
      {
        label: 'For AI',
        links: [
          {label: 'Agent guidance', href: '/agents/'},
          {label: 'Standard index', href: '/standard.json'},
          {label: 'AI / llms.txt', href: '/llms.txt'}
        ]
      }
    ]
  }
};

export function normalisePath(pathname) {
  if (!pathname || pathname === '/') return '/';
  const value = pathname.replace(/\\+/g, '/');
  return value.endsWith('/') ? value : `${value}/`;
}

export function getShellModel(pathname) {
  const path = normalisePath(pathname);
  return {
    ...PUBLIC_SHELL,
    currentPath: path,
    primaryNavigation: PUBLIC_SHELL.primaryNavigation.map((item) => ({
      ...item,
      current: normalisePath(item.href) === path
    })),
    secondaryNavigation: PUBLIC_SHELL.secondaryNavigation.map((item) => ({
      ...item,
      current: normalisePath(item.href) === path
    }))
  };
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

export const SHELL_RESPONSIVE_STYLE = `<style id="byjtt-shell-responsive">@media(max-width:850px){.nav{gap:.5rem}.nav-links{gap:.5rem}.nav-primary{gap:.5rem}.nav-links a,.nav-more summary{font-size:.8rem}.nav-primary a:not(:first-child){display:none}}</style>`;

export function renderPublicHeader(pathname) {
  const model = getShellModel(pathname);
  const links = model.primaryNavigation.map((item) =>
    `<a href="${item.href}"${item.current ? ' aria-current="page"' : ''}>${escapeHtml(item.label)}</a>`
  ).join('');
  const secondary = model.secondaryNavigation.map((item) =>
    `<a href="${item.href}"${item.current ? ' aria-current="page"' : ''}>${escapeHtml(item.label)}</a>`
  ).join('');
  return `<a class="skip" href="#main">Skip to content</a><header class="site-header"><nav class="nav" aria-label="Primary navigation"><a class="wordmark" href="/" aria-label="${escapeHtml(model.brand.ariaLabel)}">By JTT <i>Design</i></a><div class="nav-links"><div class="nav-primary">${links}</div><details class="nav-more"><summary>More</summary><div class="nav-more-links">${secondary}</div></details></div></nav></header>`;
}

export function renderPublicFooter() {
  const groups = PUBLIC_SHELL.footer.groups.map((group) => `<div class="footer-group"><strong>${escapeHtml(group.label)}</strong><div class="footer-links">${group.links.map((link) => `<a href="${link.href}">${escapeHtml(link.label)}</a>`).join('')}</div></div>`).join('');
  return `<footer class="footer"><div class="footer-inner"><div class="footer-brand"><strong>© ByJTT · ByJTT Design</strong><p>A public design standard and working product for people, designers, developers and AI agents.</p></div><div class="footer-groups">${groups}</div></div></footer>`;
}
