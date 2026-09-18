'use client';

import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';

export default function OnboardingPage() {
  const router = useRouter();
  const { completeOnboarding } = useApp();

  const handleSelect = (mode: 'new-rider' | 'commuter') => {
    completeOnboarding(mode);
    if (mode === 'new-rider') {
      router.push('/basics/fast-vs-slow');
    } else {
      router.push('/home');
    }
  };

  return (
    <div className="min-h-dvh bg-indigo flex flex-col items-center justify-center px-6 text-center">
      <div className="mb-8">
        <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-indigo-light border border-marigold/30 flex items-center justify-center">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#E8A63C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="4" y="3" width="16" height="18" rx="2" />
            <path d="M9 21v-4h6v4" />
            <path d="M4 11h16" />
            <circle cx="9" cy="7" r="1" fill="#E8A63C" />
            <circle cx="15" cy="7" r="1" fill="#E8A63C" />
            <path d="M9 15h0" />
            <path d="M15 15h0" />
          </svg>
        </div>
        <h1 className="font-serif text-4xl font-bold text-cream-light mb-2">Fatafat</h1>
        <p className="text-cream-light/60 text-sm">Western - Central - Harbour - BEST</p>
      </div>

      <div className="w-full max-w-sm bg-indigo-light/50 rounded-2xl border border-cream-light/10 p-6 mb-8">
        <h2 className="font-serif text-2xl font-bold text-cream-light mb-2">
          How well do you know Mumbai&apos;s trains?
        </h2>
        <p className="text-cream-light/50 text-sm">
          Sets your starting point - change it anytime from Settings.
        </p>
      </div>

      <div className="w-full max-w-sm space-y-3">
        <button
          onClick={() => handleSelect('new-rider')}
          className="w-full bg-marigold text-indigo rounded-xl px-6 py-4 text-left hover:bg-marigold-light transition-colors"
        >
          <div className="font-semibold text-lg">I&apos;m new here</div>
          <div className="text-sm text-indigo/70">Show me the basics first, then let me ride</div>
        </button>

        <button
          onClick={() => handleSelect('commuter')}
          className="w-full bg-transparent border-2 border-cream-light/30 text-cream-light rounded-xl px-6 py-4 text-left hover:border-cream-light/50 transition-colors"
        >
          <div className="font-semibold text-lg">I ride daily</div>
          <div className="text-sm text-cream-light/60">Keep it fast and compact</div>
        </button>
      </div>
    </div>
  );
}
