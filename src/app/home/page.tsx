'use client';

import { AppShell } from '@/components/layout/AppShell';
import { PageHeader } from '@/components/layout/PageHeader';
import { CommuterHome } from '@/components/home/CommuterHome';
import { NewRiderHome } from '@/components/home/NewRiderHome';
import { useConfidenceMode } from '@/hooks/useConfidenceMode';

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

export default function HomePage() {
  const { isCommuter } = useConfidenceMode();

  return (
    <AppShell>
      <PageHeader title="Fatafat" subtitle={getGreeting()} />
      {isCommuter ? <CommuterHome /> : <NewRiderHome />}
    </AppShell>
  );
}
