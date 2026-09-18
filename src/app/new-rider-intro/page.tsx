'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const steps = [
  {
    emoji: '🚆',
    title: 'Fast vs. slow trains',
    body: 'Mumbai trains run on the same tracks but stop at different stations. "Fast" trains skip smaller stops – great for long trips. "Slow" trains stop everywhere. The board on the platform (and this app) always tells you which is which.',
    note: 'You can always find these guides under Explore → Basics',
  },
  {
    emoji: '🚃',
    title: 'Compartments',
    body: 'Trains have general, ladies’ (yellow band), and first-class (yellow stripe) compartments. A first-class ticket costs about 3× more but is much less crowded. Ladies’ compartments are reserved for women – men face a fine.',
    note: undefined,
  },
  {
    emoji: '🎫',
    title: 'Buying a ticket',
    body: 'Buy at the counter, an ATVM, or in this app. Single tickets start at ₹5 (second class). Monthly passes break even at about 21 trips. First class is roughly 3× more.',
    note: undefined,
  },
];

export default function NewRiderIntroPage() {
  const router = useRouter();
  const [stepIndex, setStepIndex] = useState(0);
  const step = steps[stepIndex];
  const isLast = stepIndex === steps.length - 1;

  return (
    <div className="min-h-dvh bg-indigo flex flex-col">
      {/* Step dots */}
      <div className="flex justify-center gap-2 pt-12 mb-auto">
        {steps.map((_, i) => (
          <div
            key={i}
            className={`h-[4px] rounded-full transition-all ${
              i === stepIndex ? 'w-[24px] bg-marigold' : 'w-[8px] bg-cream-light/30'
            }`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <span className="text-[48px] mb-4">{step.emoji}</span>
        <h2 className="font-serif text-[24px] font-bold text-cream-light leading-[30px] mb-4">
          {step.title}
        </h2>
        <div className="bg-[#253f5f] border border-[#35506e] rounded-2xl px-5 py-4 max-w-[320px]">
          <p className="text-[14px] text-cream-light/80 leading-[21px]">
            {step.body}
          </p>
        </div>
        {step.note && (
          <p className="text-[12px] text-cream-light/40 mt-4 max-w-[280px]">
            {step.note}
          </p>
        )}
      </div>

      {/* Next button */}
      <div className="px-6 pb-8 mt-auto">
        <button
          onClick={() => {
            if (isLast) {
              router.replace('/home');
            } else {
              setStepIndex(stepIndex + 1);
            }
          }}
          className="w-full bg-marigold text-indigo font-semibold text-[15px] py-3.5 rounded-xl flex items-center justify-center gap-1 active:brightness-95 transition-all"
        >
          {isLast ? 'Let’s go' : 'Next'} <span>&rarr;</span>
        </button>
      </div>
    </div>
  );
}
