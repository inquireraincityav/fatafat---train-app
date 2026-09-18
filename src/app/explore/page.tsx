'use client';

import { useState } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { PageHeader } from '@/components/layout/PageHeader';
import { TabBar } from '@/components/ui/TabBar';
import { PlanTab } from '@/components/explore/PlanTab';
import { NetworkTab } from '@/components/explore/NetworkTab';
import { BasicsTab } from '@/components/explore/BasicsTab';

type ExploreTab = 'plan' | 'network' | 'basics';

export default function ExplorePage() {
  const [activeTab, setActiveTab] = useState<ExploreTab>('plan');

  return (
    <AppShell>
      <PageHeader title="Explore" />
      <div className="px-4">
        <TabBar
          tabs={[
            { id: 'plan' as const, label: 'Plan' },
            { id: 'network' as const, label: 'Network' },
            { id: 'basics' as const, label: 'Basics' },
          ]}
          activeTab={activeTab}
          onChange={setActiveTab}
        />

        <div className="mt-4">
          {activeTab === 'plan' && <PlanTab />}
          {activeTab === 'network' && <NetworkTab />}
          {activeTab === 'basics' && <BasicsTab />}
        </div>
      </div>
    </AppShell>
  );
}
