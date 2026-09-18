'use client';

import { useRouter } from 'next/navigation';
import { AppShell } from '@/components/layout/AppShell';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card } from '@/components/ui/Card';
import { Toggle } from '@/components/ui/Toggle';
import { useApp } from '@/context/AppContext';
import { ConfidenceMode } from '@/lib/types';

export default function SettingsPage() {
  const router = useRouter();
  const { confidenceMode, setConfidenceMode, notifications, setNotifications } = useApp();

  const modes: { id: ConfidenceMode; title: string; description: string }[] = [
    {
      id: 'new-rider',
      title: 'New Rider',
      description: 'Larger type, plain-language guides, reassurance cues on every screen',
    },
    {
      id: 'commuter',
      title: 'Commuter',
      description: 'Dense and compact - no explanations, just the data you need',
    },
  ];

  return (
    <AppShell hideNav>
      <PageHeader title="Settings" showBack showSettings={false} />
      <div className="px-4">
        <div className="mb-6">
          <h2 className="text-xs font-semibold tracking-wider text-charcoal-light uppercase mb-1">
            How well do you know Mumbai&apos;s trains?
          </h2>
          <p className="text-sm text-charcoal-light mb-3">
            This changes the layout across the whole app - not just a label.
          </p>

          <div className="space-y-2">
            {modes.map((mode) => {
              const isSelected = confidenceMode === mode.id;
              return (
                <Card
                  key={mode.id}
                  variant={isSelected ? 'selected' : 'default'}
                  padding="md"
                  onClick={() => setConfidenceMode(mode.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${
                      isSelected ? 'border-success bg-success' : 'border-charcoal-light/40'
                    }`}>
                      {isSelected && (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </div>
                    <div>
                      <div className={`font-semibold ${isSelected ? 'text-cream-light' : 'text-charcoal'}`}>
                        {mode.title}
                      </div>
                      <div className={`text-sm mt-0.5 ${isSelected ? 'text-cream-light/60' : 'text-charcoal-light'}`}>
                        {mode.description}
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          <p className="text-sm text-charcoal-light mt-3 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-success" />
            Currently in <strong>{confidenceMode === 'commuter' ? 'Commuter' : 'New Rider'}</strong> mode - tap to switch and see the difference on every screen
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-xs font-semibold tracking-wider text-charcoal-light uppercase mb-3">
            Notifications
          </h2>
          <div className="bg-cream-light rounded-xl px-4 divide-y divide-cream">
            <Toggle
              label="Alert 1 stop before exit"
              description="Most important - don't miss your stop"
              checked={notifications.alertBeforeExit}
              onChange={(v) => setNotifications({ ...notifications, alertBeforeExit: v })}
            />
            <Toggle
              label="Delay notifications"
              checked={notifications.delayNotifications}
              onChange={(v) => setNotifications({ ...notifications, delayNotifications: v })}
            />
            <Toggle
              label="Crowd level updates"
              checked={notifications.crowdLevelUpdates}
              onChange={(v) => setNotifications({ ...notifications, crowdLevelUpdates: v })}
            />
            <Toggle
              label="Last bus alert"
              description="Reminds you when the last BEST bus is near"
              checked={notifications.lastBusAlert}
              onChange={(v) => setNotifications({ ...notifications, lastBusAlert: v })}
            />
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xs font-semibold tracking-wider text-charcoal-light uppercase mb-3">
            Saved data
          </h2>
          <div className="bg-cream-light rounded-xl px-4 divide-y divide-cream">
            <div className="flex items-center justify-between py-3.5">
              <span className="text-charcoal">Offline timetable</span>
              <span className="text-sm text-charcoal-light">Updated today, 7:14 AM</span>
            </div>
            <div className="flex items-center justify-between py-3.5">
              <span className="text-charcoal">Saved routes</span>
              <span className="text-sm text-charcoal-light">2 routes</span>
            </div>
            <div className="flex items-center justify-between py-3.5">
              <span className="text-charcoal">App version</span>
              <span className="text-sm text-charcoal-light">Sahi Local 1.0</span>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xs font-semibold tracking-wider text-charcoal-light uppercase mb-3">
            Contact us
          </h2>
          <div className="bg-cream-light rounded-xl px-4 divide-y divide-cream">
            <button
              onClick={() => router.push('/settings/contact')}
              className="flex items-center justify-between py-3.5 w-full text-left"
            >
              <span className="text-charcoal">Send a message</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B6860" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
            <a
              href="tel:+918843298499"
              className="flex items-center justify-between py-3.5 w-full"
            >
              <span className="text-charcoal">Call support</span>
              <span className="text-sm text-charcoal-light">+91 88432 98499</span>
            </a>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
