export const PUBLIC_SHELL = {
  brand: {
    label: 'By JTT Design',
    href: '/',
    ariaLabel: 'ByJTT Design home'
  },
  primaryNavigation: [
    {label: 'Standard', href: '/standard/'},
    {label: 'Research', href: '/research/'},
    {label: 'Contracts', href: '/contracts/'},
    {label: 'Agents', href: '/agents/'},
    {label: 'Library', href: '/library/'},
    {label: 'Benchmarks', href: '/benchmarks/'}
  ],
  primaryAction: {label: 'Open Studio', href: '/studio'},
  footer: {
    groups: [
      {
        label: 'Explore',
        links: [
          {label: 'Standard', href: '/standard/'},
          {label: 'Research', href: '/research/'},
          {label: 'Contracts', href: '/contracts/'},
          {label: 'Agents', href: '/agents/'},
          {label: 'Library', href: '/library/'},
          {label: 'Benchmarks', href: '/benchmarks/'}
        ]
      },
      {
        label: 'Use',
        links: [
          {label: 'Open Studio', href: '/studio'},
          {label: 'Documentation', href: '/docs/'}
        ]
      },
      {
        label: 'Machine-readable',
        links: [
          {label: 'Standard index', href: '/standard.json'},
          {label: 'AI / llms.txt', href: '/llms.txt'}
        ]
      }
    ]
  }
};

export function normalisePath(pathname) {
  if (!pathname || pathname === '/') return '/';
  const value = pathname.replace(/\/+/g, '/');
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
    }))
  };
}
