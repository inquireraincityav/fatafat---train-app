'use client';

import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { BasicsTopic } from '@/lib/types';

const topics: { id: BasicsTopic; title: string; description: string; emoji: string }[] = [
  {
    id: 'fast-vs-slow',
    title: 'Fast vs. slow trains',
    emoji: '🚆',
    description: 'Which train gets you there, and when to use each',
  },
  {
    id: 'compartments',
    title: 'Compartments',
    emoji: '🚪',
    description: 'Ladies\' coaches, general, and first class explained',
  },
  {
    id: 'fares',
    title: 'Fares & tickets',
    emoji: '🎫',
    description: 'Prices, passes, and where to buy',
  },
];

export function BasicsTab() {
  const router = useRouter();

  return (
    <div>
      <p className="text-sm text-charcoal-light mb-4">
        Everything you need to ride Mumbai&apos;s trains - revisit anytime.
      </p>

      <div className="space-y-3">
        {topics.map((topic) => (
          <Card
            key={topic.id}
            variant="elevated"
            padding="md"
            onClick={() => router.push(`/basics/${topic.id}`)}
          >
            <div className="flex items-center gap-4">
              <div className="text-3xl shrink-0">{topic.emoji}</div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-indigo">{topic.title}</h3>
                <p className="text-sm text-charcoal-light mt-0.5">{topic.description}</p>
              </div>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6B6860" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
