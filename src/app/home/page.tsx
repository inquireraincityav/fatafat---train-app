'use client';

import { useApp } from '@/context/AppContext';
import { AppShell } from '@/components/layout/AppShell';
import { PageHeader } from '@/components/layout/PageHeader';
import { CommuterHome } from '@/components/home/CommuterHome';
import { NewRiderHome } from '@/components/home/NewRiderHome';

function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

export default function HomePage() {
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
      <PageHeader title="Fatafat" />
      <p className="px-4 text-[13px] text-charcoal-light mb-3">{getGreeting()}</p>
      {confidenceMode === 'commuter' ? <CommuterHome /> : <NewRiderHome />}
    </AppShell>
  );
}
