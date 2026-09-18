'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { ConfidenceMode } from '@/lib/types';

export default function SettingsPage() {
  const router = useRouter();
  const { confidenceMode, setConfidenceMode, setHasOnboarded, hydrated } = useApp();
  const [notifications, setNotifications] = useState({
    exitAlert: true,
    delays: true,
    crowd: false,
    lastBus: true,
  });

  if (!hydrated) return <div className="min-h-dvh bg-cream" />;

  function toggleNotif(key: keyof typeof notifications) {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  return (
    <div className="min-h-dvh bg-cream">
      {/* Header */}
      <header className="px-4 pt-[env(safe-area-inset-top)]">
        <div className="flex items-center gap-3 pt-3 pb-4">
          <button onClick={() => router.back()} className="p-1 -ml-1" aria-label="Go back">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1F3A5F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
          </button>
          <h1 className="font-serif text-[22px] font-bold text-indigo">Settings</h1>
        </div>
      </header>

      <div className="px-4">
        {/* Confidence mode */}
        <p className="text-[11px] font-semibold tracking-[0.8px] text-charcoal-light uppercase mb-1">
          How well do you know Mumbai&rsquo;s trains?
        </p>
        <p className="text-[13px] text-charcoal-light mb-3">
          This changes the layout across the whole app &ndash; not just a label.
        </p>

        <div className="space-y-2.5 mb-3">
          {/* New Rider option */}
          <button
            onClick={() => setConfidenceMode('new-rider')}
            className={`w-full rounded-2xl px-5 py-4 text-left transition-all border ${
              confidenceMode === 'new-rider'
                ? 'bg-indigo border-indigo text-cream-light'
                : 'bg-cream-light border-[#d8cebc] text-charcoal'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 flex-shrink-0 ${
                confidenceMode === 'new-rider' ? 'border-marigold bg-marigold' : 'border-[#d8cebc]'
              }`}>
                {confidenceMode === 'new-rider' && (
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <div>
                <span className="block text-[15px] font-semibold leading-[20px]">New Rider</span>
                <span className={`block text-[13px] leading-[18px] mt-0.5 ${
                  confidenceMode === 'new-rider' ? 'text-cream-light/70' : 'text-charcoal-light'
                }`}>
                  Larger type, plain-language guides, reassurance cues on every screen
                </span>
              </div>
            </div>
          </button>

          {/* Commuter option */}
          <button
            onClick={() => setConfidenceMode('commuter')}
            className={`w-full rounded-2xl px-5 py-4 text-left transition-all border ${
              confidenceMode === 'commuter'
                ? 'bg-indigo border-indigo text-cream-light'
                : 'bg-cream-light border-[#d8cebc] text-charcoal'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 flex-shrink-0 ${
                confidenceMode === 'commuter' ? 'border-marigold bg-marigold' : 'border-[#d8cebc]'
              }`}>
                {confidenceMode === 'commuter' && (
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <div>
                <span className="block text-[15px] font-semibold leading-[20px]">Commuter</span>
                <span className={`block text-[13px] leading-[18px] mt-0.5 ${
                  confidenceMode === 'commuter' ? 'text-cream-light/70' : 'text-charcoal-light'
                }`}>
                  Dense and compact &ndash; no explanations, just the data you need
                </span>
              </div>
            </div>
          </button>
        </div>

        <p className="text-[12px] text-charcoal-light mb-6 flex items-start gap-1.5">
          <span className="w-2 h-2 rounded-full bg-marigold mt-1 flex-shrink-0" />
          Currently in <strong>{confidenceMode === 'commuter' ? 'Commuter' : 'New Rider'}</strong> mode &ndash; tap to switch and see the difference on every screen
        </p>

        {/* Notifications */}
        <p className="text-[11px] font-semibold tracking-[0.8px] text-charcoal-light uppercase mb-3">
          Notifications
        </p>
        <div className="space-y-0 mb-6">
          {[
            { key: 'exitAlert' as const, label: 'Alert 1 stop before exit', desc: 'Most important – don’t miss your stop' },
            { key: 'delays' as const, label: 'Delay notifications', desc: undefined },
            { key: 'crowd' as const, label: 'Crowd level updates', desc: undefined },
            { key: 'lastBus' as const, label: 'Last bus alert', desc: 'Reminds you when the last BEST bus is near' },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between py-3.5 border-b border-[#ede5d8]">
              <div>
                <span className="text-[14px] text-charcoal">{item.label}</span>
                {item.desc && <p className="text-[12px] text-charcoal-light mt-0.5">{item.desc}</p>}
              </div>
              <button
                onClick={() => toggleNotif(item.key)}
                className={`w-[44px] h-[24px] rounded-full p-0.5 transition-colors flex-shrink-0 ${
                  notifications[item.key] ? 'bg-marigold' : 'bg-[#d8cebc]'
                }`}
              >
                <div className={`w-[20px] h-[20px] rounded-full bg-white shadow-sm transition-transform ${
                  notifications[item.key] ? 'translate-x-[20px]' : 'translate-x-0'
                }`} />
              </button>
            </div>
          ))}
        </div>

        {/* Saved Data */}
        <p className="text-[11px] font-semibold tracking-[0.8px] text-charcoal-light uppercase mb-3">
          Saved data
        </p>
        <div className="bg-cream-light border border-[#d8cebc] rounded-xl overflow-hidden mb-6">
          {[
            { label: 'Offline timetable', value: 'Updated today, 7:14 AM' },
            { label: 'Saved routes', value: '2 routes' },
            { label: 'App version', value: 'Sahi Local 1.0' },
          ].map((item, i) => (
            <div key={item.label} className={`flex items-center justify-between px-4 py-3 ${i < 2 ? 'border-b border-[#ede5d8]' : ''}`}>
              <span className="text-[14px] text-charcoal">{item.label}</span>
              <span className="text-[13px] text-charcoal-light">{item.value}</span>
            </div>
          ))}
        </div>

        {/* Contact us */}
        <p className="text-[11px] font-semibold tracking-[0.8px] text-charcoal-light uppercase mb-3">
          Contact us
        </p>
        <div className="bg-cream-light border border-[#d8cebc] rounded-xl overflow-hidden mb-6">
          <button className="w-full flex items-center justify-between px-4 py-3 border-b border-[#ede5d8]">
            <span className="text-[14px] text-charcoal">Send feedback</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a09890" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
          <button
            onClick={() => {
              try { localStorage.removeItem('fatafat-state'); } catch {}
              setHasOnboarded(false);
              router.push('/onboarding');
            }}
            className="w-full flex items-center justify-between px-4 py-3"
          >
            <span className="text-[14px] text-rust">Reset app</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C1502E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
