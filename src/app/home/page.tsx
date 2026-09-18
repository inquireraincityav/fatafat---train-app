'use client';

import { useApp } from '@/context/AppContext';
import { AppShell } from '@/components/layout/AppShell';
import { CommuterHome } from '@/components/home/CommuterHome';
import { NewRiderHome } from '@/components/home/NewRiderHome';
import { useRouter } from 'next/navigation';

function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

export default function HomePage() {
  const router = useRouter();
  const { confidenceMode, hydrated } = useApp();

  if (!hydrated) {
    return (
      <AppShell>
        <div className="min-h-dvh bg-cream" />
      </AppShell>
    );
  }

  return (
    <AppShell>
      {/* Header matching Figma */}
      <header className="flex items-center justify-between px-4 pt-[env(safe-area-inset-top)] pb-0">
        <div className="pt-3">
          <h1 className="font-serif text-[22px] font-bold text-indigo leading-[28px]">Fatafat</h1>
          <p className="text-[13px] text-charcoal-light">{getGreeting()}</p>
        </div>
        <button
          onClick={() => router.push('/settings')}
          className="w-[32px] h-[32px] rounded-full bg-cream-light border border-[#d8cebc] flex items-center justify-center mt-3"
          aria-label="Settings"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1F3A5F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
        </button>
      </header>

      <div className="mt-2">
        {confidenceMode === 'commuter' ? <CommuterHome /> : <NewRiderHome />}
      </div>
    </AppShell>
  );
}
