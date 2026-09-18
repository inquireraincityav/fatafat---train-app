'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Button } from '@/components/ui/Button';

const topics: Record<string, { title: string; steps: { heading: string; body: string }[] }> = {
  'fast-vs-slow': {
    title: 'Fast vs. slow trains',
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
    title: 'Buying a ticket',
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
  const isFirst = stepIndex === 0;
  const isLast = stepIndex === topic.steps.length - 1;

  return (
    <div className="min-h-dvh bg-indigo flex flex-col">
      <header className="px-4 pt-12 pb-4">
        <button onClick={() => router.back()} className="p-1 -ml-1" aria-label="Go back">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F4EDE0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
        </button>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <div className="mb-6">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <rect x="4" y="16" width="40" height="16" rx="3" fill="#E8A63C" />
            <circle cx="14" cy="36" r="3" fill="#F4EDE0" />
            <circle cx="34" cy="36" r="3" fill="#F4EDE0" />
          </svg>
        </div>

        <h2 className="font-serif text-[22px] font-bold text-cream-light mb-4">{step.heading}</h2>
        <p className="text-[15px] text-cream-light/80 leading-[22px] max-w-[300px]">{step.body}</p>
      </div>

      <div className="flex justify-center gap-1.5 mb-4">
        {topic.steps.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full ${i === stepIndex ? 'bg-marigold' : 'bg-cream-light/30'}`}
          />
        ))}
      </div>

      <div className="px-6 pb-8 flex gap-3">
        {!isFirst && (
          <Button variant="ghost" size="lg" className="flex-1 text-cream-light border border-cream-light/20" onClick={() => setStepIndex(stepIndex - 1)}>
            Back
          </Button>
        )}
        <Button
          variant="primary"
          size="lg"
          className="flex-1"
          onClick={() => isLast ? router.back() : setStepIndex(stepIndex + 1)}
        >
          {isLast ? 'Got it – let’s go' : 'Next'}
        </Button>
      </div>
    </div>
  );
}
