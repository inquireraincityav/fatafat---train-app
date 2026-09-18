'use client';

import { usePathname, useRouter } from 'next/navigation';

const tabs = [
  {
    id: 'home',
    label: 'Home',
    path: '/home',
    icon: (active: boolean) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={active ? '#E8A63C' : '#6B6860'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    id: 'tickets',
    label: 'Tickets',
    path: '/tickets',
    icon: (active: boolean) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={active ? '#E8A63C' : '#6B6860'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M2 10h20" />
        <path d="M7 15h4" />
        <path d="M7 18h2" />
      </svg>
    ),
  },
  {
    id: 'explore',
    label: 'Explore',
    path: '/explore',
    icon: (active: boolean) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={active ? '#E8A63C' : '#6B6860'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
      </svg>
    ),
  },
];

export function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();

  const activeTab = tabs.find((t) => pathname.startsWith(t.path))?.id || 'home';

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-cream-light border-t border-cream pb-safe z-50">
      <div className="flex items-center justify-around pt-2 pb-1">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => router.push(tab.path)}
              className="flex flex-col items-center gap-1 px-6 py-1"
            >
              {tab.icon(isActive)}
              <span
                className={`text-xs font-medium ${
                  isActive ? 'text-marigold' : 'text-charcoal-light'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
