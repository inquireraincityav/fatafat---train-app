'use client';

import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { ConfidenceMode } from '@/lib/types';

export default function SettingsPage() {
  const router = useRouter();
  const { confidenceMode, setConfidenceMode, setHasOnboarded, hydrated } = useApp();

  if (!hydrated) return <div className="min-h-dvh bg-cream" />;

  const modes: { id: ConfidenceMode; label: string; desc: string }[] = [
    { id: 'new-rider', label: 'New rider', desc: 'Show guides, explanations, and helpful tips' },
    { id: 'commuter', label: 'Commuter', desc: 'Compact, data-dense, skip the basics' },
  ];

  return (
    <div className="min-h-dvh bg-cream">
      <header className="px-4 pt-[env(safe-area-inset-top)]">
        <div className="flex items-center gap-2 pt-3 pb-2">
          <button onClick={() => router.back()} className="p-1 -ml-1" aria-label="Go back">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1F3A5F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
          </button>
          <h1 className="font-serif text-[22px] font-bold text-indigo">Settings</h1>
        </div>
      </header>

      <div className="px-4 mt-2">
        {/* Confidence mode */}
        <p className="text-[11px] font-semibold tracking-[0.8px] text-[#a09890] uppercase mb-2">
          Experience level
        </p>
        <div className="space-y-2 mb-6">
          {modes.map((mode) => (
            <button
              key={mode.id}
              onClick={() => setConfidenceMode(mode.id)}
              className={`w-full flex items-start gap-3 px-4 py-3.5 rounded-xl border transition-colors text-left ${
                confidenceMode === mode.id
                  ? 'bg-cream-light border-marigold ring-1 ring-marigold'
                  : 'bg-cream-light border-[#d8cebc]'
              }`}
            >
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 ${
                confidenceMode === mode.id ? 'border-marigold' : 'border-[#d8cebc]'
              }`}>
                {confidenceMode === mode.id && <div className="w-2.5 h-2.5 rounded-full bg-marigold" />}
              </div>
              <div>
                <span className="text-[14px] font-medium text-charcoal">{mode.label}</span>
                <p className="text-[12px] text-charcoal-light mt-0.5">{mode.desc}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Notifications */}
        <p className="text-[11px] font-semibold tracking-[0.8px] text-[#a09890] uppercase mb-2">
          Notifications
        </p>
        <div className="bg-cream-light border border-[#d8cebc] rounded-xl overflow-hidden mb-6">
          {['Departure alerts', 'Crowd updates', 'Service disruptions'].map((label, i) => (
            <div
              key={label}
              className={`flex items-center justify-between px-4 py-3 ${i < 2 ? 'border-b border-[#ede5d8]' : ''}`}
            >
              <span className="text-[14px] text-charcoal">{label}</span>
              <div className="w-[44px] h-[24px] rounded-full bg-marigold p-0.5 cursor-pointer">
                <div className="w-[20px] h-[20px] rounded-full bg-white ml-auto shadow-sm" />
              </div>
            </div>
          ))}
        </div>

        {/* Saved data */}
        <p className="text-[11px] font-semibold tracking-[0.8px] text-[#a09890] uppercase mb-2">
          Data
        </p>
        <div className="bg-cream-light border border-[#d8cebc] rounded-xl overflow-hidden mb-6">
          <button className="w-full flex items-center justify-between px-4 py-3 border-b border-[#ede5d8]">
            <span className="text-[14px] text-charcoal">Clear saved routes</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a09890" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C1502E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
