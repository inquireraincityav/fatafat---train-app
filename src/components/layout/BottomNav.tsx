'use client';

import { usePathname, useRouter } from 'next/navigation';

const tabs = [
  {
    id: 'home',
    label: 'Home',
    path: '/home',
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? '#E8A63C' : 'none'} stroke={active ? '#E8A63C' : '#a09890'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" fill={active ? '#F4EDE0' : 'none'} stroke={active ? '#E8A63C' : '#a09890'} />
      </svg>
    ),
  },
  {
    id: 'tickets',
    label: 'Tickets',
    path: '/tickets',
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? '#E8A63C' : '#a09890'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 9a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-4V9z" />
        <path d="M9 7v12" strokeDasharray="2 2" />
      </svg>
    ),
  },
  {
    id: 'explore',
    label: 'Explore',
    path: '/explore',
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? '#E8A63C' : '#a09890'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill={active ? '#E8A63C' : 'none'} />
      </svg>
    ),
  },
];

export function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();

  const activeTab = tabs.find((t) => pathname.startsWith(t.path))?.id || 'home';

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-cream-light border-t border-[#ddd5c8] pb-safe z-50">
      <div className="flex items-center justify-around pt-1 pb-1">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => router.push(tab.path)}
              className="flex flex-col items-center gap-0.5 px-6 py-1"
            >
              {tab.icon(isActive)}
              <span
                className={`text-[10px] font-medium ${
                  isActive ? 'text-marigold' : 'text-[#a09890]'
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
