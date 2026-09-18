'use client';

import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';

export default function OnboardingPage() {
  const router = useRouter();
  const { setConfidenceMode, setHasOnboarded } = useApp();

  function handleChoice(mode: 'new-rider' | 'commuter') {
    setConfidenceMode(mode);
    setHasOnboarded(true);
    if (mode === 'new-rider') {
      router.replace('/new-rider-intro');
    } else {
      router.replace('/home');
    }
  }

  return (
    <div className="min-h-dvh bg-indigo flex flex-col items-center px-6">
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-[370px]">
        {/* Train icon */}
        <div className="w-[56px] h-[56px] rounded-[14px] bg-[#2a4a6e] flex items-center justify-center mb-4">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <rect x="6" y="4" width="16" height="18" rx="3" fill="#E8A63C" />
            <rect x="9" y="7" width="4" height="4" rx="1" fill="#1F3A5F" />
            <rect x="15" y="7" width="4" height="4" rx="1" fill="#1F3A5F" />
            <circle cx="10" cy="17" r="1.5" fill="#1F3A5F" />
            <circle cx="18" cy="17" r="1.5" fill="#1F3A5F" />
            <rect x="8" y="22" width="2" height="3" rx="0.5" fill="#E8A63C" opacity="0.6" />
            <rect x="18" y="22" width="2" height="3" rx="0.5" fill="#E8A63C" opacity="0.6" />
          </svg>
        </div>

        {/* Brand name */}
        <h1 className="font-serif text-[32px] font-bold text-cream-light leading-[38px] mb-1">
          Fatafat
        </h1>
        <p className="text-[13px] text-cream-light/60 tracking-wide mb-10">
          Western &middot; Central &middot; Harbour &middot; BEST
        </p>

        {/* Question card */}
        <div className="w-full bg-[#253f5f] border border-[#35506e] rounded-2xl px-6 py-5 mb-6 text-center">
          <h2 className="font-serif text-[22px] font-bold text-cream-light leading-[28px] mb-2">
            How well do you know Mumbai&rsquo;s trains?
          </h2>
          <p className="text-[13px] text-cream-light/50 leading-[18px]">
            Sets your starting point &ndash; change it anytime from Settings.
          </p>
        </div>

        {/* Choice buttons */}
        <div className="w-full space-y-3">
          <button
            onClick={() => handleChoice('new-rider')}
            className="w-full bg-marigold rounded-2xl px-5 py-4 text-left active:brightness-95 transition-all"
          >
            <span className="block text-[16px] font-bold text-indigo leading-[22px]">
              I&rsquo;m new here
            </span>
            <span className="block text-[13px] text-indigo/70 leading-[18px] mt-0.5">
              Show me the basics first, then let me ride
            </span>
          </button>

          <button
            onClick={() => handleChoice('commuter')}
            className="w-full bg-transparent border border-marigold/40 rounded-2xl px-5 py-4 text-left hover:bg-cream-light/5 active:bg-cream-light/10 transition-all"
          >
            <span className="block text-[16px] font-bold text-cream-light leading-[22px]">
              I ride daily
            </span>
            <span className="block text-[13px] text-cream-light/50 leading-[18px] mt-0.5">
              Keep it fast and compact
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
