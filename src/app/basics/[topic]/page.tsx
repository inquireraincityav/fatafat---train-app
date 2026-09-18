'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

const topics: Record<string, { title: string; emoji: string; steps: { heading: string; body: string }[] }> = {
  'fast-vs-slow': {
    title: 'Fast vs. slow trains',
    emoji: '🚆',
    steps: [
      {
        heading: 'Two types of trains',
        body: 'Mumbai suburban trains come in two types: slow (stopping) trains that halt at every station, and fast (express) trains that skip smaller stations. Fast trains are quicker end-to-end, but make sure yours stops at your station before boarding.',
      },
      {
        heading: 'How to tell them apart',
        body: 'Platform indicators and departure boards list each train as "slow" or "fast". In the app, every departure card shows the type. Fast trains generally use different platforms than slow ones at major junctions like Dadar and Andheri.',
      },
      {
        heading: 'When to pick which',
        body: 'If your origin and destination are both fast-train stops, always take the fast – it saves 10–20 minutes. If either station is a slow-only stop, you need the slow. Check your station’s schedule or use the app’s route planner.',
      },
    ],
  },
  compartments: {
    title: 'Compartments',
    emoji: '🚃',
    steps: [
      {
        heading: 'General compartment',
        body: 'Open to everyone. Gets crowded fastest near the doors closest to the platform exit. Board from the middle of the coach for more room.',
      },
      {
        heading: 'Ladies’ compartment',
        body: 'Marked with a yellow band, usually at the front or middle of the train. Reserved for women. Men caught inside face a fine.',
      },
      {
        heading: 'First class',
        body: 'Marked with a yellow stripe outside. You need a first-class ticket – it’s checked on board. Less crowded, padded seats, but roughly 3× the price of second class.',
      },
    ],
  },
  fares: {
    title: 'Fares & tickets',
    emoji: '🎫',
    steps: [
      {
        heading: 'Ticket types',
        body: 'Single (one way), Return (round trip, valid same day), Monthly pass (unlimited rides for 30 days), and Quarterly pass (90 days, best per-trip value). All are available in second and first class.',
      },
      {
        heading: 'Where to buy',
        body: 'At the station counter or an Automatic Ticket Vending Machine (ATVM). Some stations accept UPI payments at the counter. Monthly and quarterly passes require a photo ID.',
      },
      {
        heading: 'Prices',
        body: 'Second class single tickets start at ₹5 for short distances and go up to ₹15 for longer routes. First class is roughly 3× more. Monthly passes break even at about 21 trips.',
      },
    ],
  },
};

export default function BasicsTopicPage() {
  const router = useRouter();
  const params = useParams();
  const topicId = params.topic as string;
  const topic = topics[topicId];
  const [stepIndex, setStepIndex] = useState(0);

  if (!topic) {
    return (
      <div className="min-h-dvh bg-indigo flex items-center justify-center">
        <p className="text-cream-light">Topic not found</p>
      </div>
    );
  }

  const step = topic.steps[stepIndex];
  const isLast = stepIndex === topic.steps.length - 1;

  return (
    <div className="min-h-dvh bg-indigo flex flex-col">
      {/* Header with back */}
      <header className="px-4 pt-[env(safe-area-inset-top)]">
        <button onClick={() => router.back()} className="p-1 -ml-1 pt-3" aria-label="Go back">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F4EDE0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
        </button>
      </header>

      {/* Step dots */}
      <div className="flex justify-center gap-2 mt-2 mb-auto">
        {topic.steps.map((_, i) => (
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
        <span className="text-[48px] mb-4">{topic.emoji}</span>
        <h2 className="font-serif text-[24px] font-bold text-cream-light leading-[30px] mb-4">
          {step.heading}
        </h2>
        <div className="bg-[#253f5f] border border-[#35506e] rounded-2xl px-5 py-4 max-w-[320px]">
          <p className="text-[14px] text-cream-light/80 leading-[21px]">
            {step.body}
          </p>
        </div>
      </div>

      {/* Navigation */}
      <div className="px-6 pb-8 mt-auto flex gap-3">
        {stepIndex > 0 && (
          <button
            onClick={() => setStepIndex(stepIndex - 1)}
            className="flex-1 bg-transparent border border-cream-light/20 text-cream-light font-medium text-[15px] py-3 rounded-xl active:bg-cream-light/10 transition-colors"
          >
            Back
          </button>
        )}
        <button
          onClick={() => {
            if (isLast) {
              router.back();
            } else {
              setStepIndex(stepIndex + 1);
            }
          }}
          className="flex-1 bg-marigold text-indigo font-semibold text-[15px] py-3 rounded-xl flex items-center justify-center gap-1 active:brightness-95 transition-all"
        >
          {isLast ? 'Got it – let’s go' : 'Next'} {!isLast && <span>&rarr;</span>}
        </button>
      </div>
    </div>
  );
}
