'use client';

import { usePathname, useRouter } from 'next/navigation';

const tabs = [
  {
    label: 'Home',
    path: '/home',
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? '#1F3A5F' : 'none'} stroke={active ? '#1F3A5F' : '#6B6860'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    label: 'Tickets',
    path: '/tickets',
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? '#1F3A5F' : '#6B6860'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M2 10h20" />
        <path d="M7 15h4" />
      </svg>
    ),
  },
  {
    label: 'Explore',
    path: '/explore',
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? '#1F3A5F' : '#6B6860'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 3 21 3 21 8" />
        <line x1="4" y1="20" x2="21" y2="3" />
        <polyline points="21 16 21 21 16 21" />
        <line x1="15" y1="15" x2="21" y2="21" />
        <line x1="4" y1="4" x2="9" y2="9" />
      </svg>
    ),
  },
];

export function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-cream-light border-t border-[#ede5d8] z-50">
      <div className="flex items-center justify-around h-[60px]">
        {tabs.map((tab) => {
          const active = pathname?.startsWith(tab.path);
          return (
            <button
              key={tab.path}
              onClick={() => router.push(tab.path)}
              className="flex flex-col items-center gap-0.5 py-1 px-3"
            >
              {tab.icon(!!active)}
              <span
                className={`text-[10px] leading-[14px] ${active ? 'text-indigo font-semibold' : 'text-charcoal-light'}`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
      <div className="h-[env(safe-area-inset-bottom)]" />
    </nav>
  );
}
