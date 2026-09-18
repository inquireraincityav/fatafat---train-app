'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { BasicsTopic } from '@/lib/types';

const topicData: Record<BasicsTopic, { title: string; emoji: string; content: string }[]> = {
  'fast-vs-slow': [
    {
      title: 'Fast vs. slow trains',
      emoji: '🚆',
      content: 'Mumbai trains run on the same tracks but stop at different stations. "Fast" trains skip smaller stops - great for long trips. "Slow" trains stop everywhere. The board on the platform (and this app) always tells you which is which.',
    },
  ],
  compartments: [
    {
      title: 'Which compartment?',
      emoji: '🚪',
      content: 'Each train has a ladies\' compartment (yellow band, front or middle) and first-class coaches (yellow stripe outside). The rest are general - open to everyone. Don\'t worry, the app shows you where to stand on the platform.',
    },
  ],
  fares: [
    {
      title: 'Buying a ticket',
      emoji: '🎫',
      content: 'Buy at the station counter or an ATVM machine before boarding. Second class is ₹10-25 for most trips. Keep the ticket - ticket checkers (TCs) can check on board. Monthly passes save money if you\'ll ride regularly.',
    },
  ],
};

const topicOrder: BasicsTopic[] = ['fast-vs-slow', 'compartments', 'fares'];

export default function BasicsTopicPage() {
  const router = useRouter();
  const params = useParams();
  const topic = params.topic as BasicsTopic;
  const [currentSlide, setCurrentSlide] = useState(0);

  const currentIndex = topicOrder.indexOf(topic);
  const slides = topicData[topic] || topicData['fast-vs-slow'];
  const slide = slides[currentSlide];

  const isFirst = currentIndex === 0;
  const isLast = currentIndex === topicOrder.length - 1;

  const handleNext = () => {
    if (isLast) {
      router.push('/home');
    } else {
      router.push(`/basics/${topicOrder[currentIndex + 1]}`);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      router.push(`/basics/${topicOrder[currentIndex - 1]}`);
    }
  };

  return (
    <div className="min-h-dvh bg-indigo flex flex-col">
      <div className="flex items-center justify-center gap-2 pt-12 pb-8">
        {topicOrder.map((t, i) => (
          <div
            key={t}
            className={`h-1 rounded-full transition-all ${
              i === currentIndex ? 'w-8 bg-marigold' : 'w-2.5 bg-cream-light/30'
            }`}
          />
        ))}
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
        <div className="text-5xl mb-6">{slide.emoji}</div>
        <h1 className="font-serif text-2xl font-bold text-cream-light mb-6">
          {slide.title}
        </h1>

        <div className="bg-indigo-light/50 border border-cream-light/10 rounded-2xl p-6 mb-6">
          <p className="text-cream-light/80 leading-relaxed">
            {slide.content}
          </p>
        </div>

        <p className="text-sm text-cream-light/40">
          You can always find these guides under Explore → Basics
        </p>
      </div>

      <div className="px-6 pb-10 flex gap-3">
        {!isFirst && (
          <Button variant="outline" size="lg" onClick={handleBack} className="flex-1 border-cream-light/30 text-cream-light hover:bg-indigo-light">
            Back
          </Button>
        )}
        <Button variant="primary" size="lg" onClick={handleNext} className="flex-1">
          {isLast ? "Got it - let's go →" : 'Next →'}
        </Button>
      </div>
    </div>
  );
}
