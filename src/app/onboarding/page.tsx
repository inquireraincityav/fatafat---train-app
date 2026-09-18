'use client';

import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';

export default function OnboardingPage() {
  const router = useRouter();
  const { setConfidenceMode, setHasOnboarded } = useApp();

  function handleChoice(mode: 'new-rider' | 'commuter') {
    setConfidenceMode(mode);
    setHasOnboarded(true);
    router.replace('/home');
  }

  return (
    <div className="min-h-dvh bg-indigo flex flex-col items-center justify-center px-6">
      <div className="flex-1 flex flex-col items-center justify-center max-w-[320px] w-full">
        <div className="mb-8">
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
            <rect x="4" y="20" width="48" height="20" rx="4" fill="#E8A63C" />
            <rect x="8" y="16" width="40" height="4" rx="2" fill="#F5D590" />
            <circle cx="16" cy="44" r="4" fill="#F4EDE0" />
            <circle cx="40" cy="44" r="4" fill="#F4EDE0" />
            <rect x="12" y="24" width="8" height="6" rx="1" fill="#1F3A5F" />
            <rect x="24" y="24" width="8" height="6" rx="1" fill="#1F3A5F" />
            <rect x="36" y="24" width="8" height="6" rx="1" fill="#1F3A5F" />
          </svg>
        </div>

        <h1 className="font-serif text-[28px] font-bold text-cream-light text-center leading-[34px] mb-2">
          How well do you know Mumbai&rsquo;s trains?
        </h1>
        <p className="text-[14px] leading-[21px] text-cream-light/70 text-center mb-10">
          This just sets a starting point &ndash; you can change it anytime from Settings.
        </p>

        <div className="w-full space-y-3">
          <button
            onClick={() => handleChoice('new-rider')}
            className="w-full bg-cream-light/10 border border-cream-light/20 rounded-[14px] px-5 py-4 text-left hover:bg-cream-light/15 active:bg-cream-light/20 transition-colors"
          >
            <span className="block text-[16px] font-semibold text-cream-light leading-[22px]">
              I&rsquo;m new here
            </span>
            <span className="block text-[13px] text-cream-light/60 leading-[18px] mt-0.5">
              Show me the basics as I go
            </span>
          </button>

          <button
            onClick={() => handleChoice('commuter')}
            className="w-full bg-cream-light/10 border border-cream-light/20 rounded-[14px] px-5 py-4 text-left hover:bg-cream-light/15 active:bg-cream-light/20 transition-colors"
          >
            <span className="block text-[16px] font-semibold text-cream-light leading-[22px]">
              I ride daily
            </span>
            <span className="block text-[13px] text-cream-light/60 leading-[18px] mt-0.5">
              Keep it fast and compact
            </span>
          </button>
        </div>
      </div>

      <p className="text-[11px] text-cream-light/40 pb-8 text-center">
        Fatafat &ndash; Mumbai Transit Companion
      </p>
    </div>
  );
}
