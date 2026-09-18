'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { RouteInput } from '@/components/ui/RouteInput';
import { Button } from '@/components/ui/Button';

export function PlanTab() {
  const router = useRouter();
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [mode, setMode] = useState<'depart' | 'reach'>('depart');

  return (
    <div className="flex flex-col items-center justify-center flex-1 py-12">
      <div className="text-6xl mb-4">🗺️</div>
      <h2 className="font-serif text-xl font-bold text-indigo mb-2">Where to?</h2>
      <p className="text-sm text-charcoal-light text-center mb-8 px-4">
        Pick a start and destination below to see routes, times, and fares.
      </p>

      <div className="w-full px-4 space-y-4">
        <RouteInput
          from={from}
          to={to}
          onFromClick={() => router.push('/station-picker?field=from&returnTo=/explore')}
          onToClick={() => router.push('/station-picker?field=to&returnTo=/explore')}
        />

        <div className="flex items-center gap-3">
          <div className="flex bg-cream rounded-lg p-0.5">
            <button
              onClick={() => setMode('depart')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                mode === 'depart' ? 'bg-white text-indigo shadow-sm' : 'text-charcoal-light'
              }`}
            >
              Depart
            </button>
            <button
              onClick={() => setMode('reach')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                mode === 'reach' ? 'bg-white text-indigo shadow-sm' : 'text-charcoal-light'
              }`}
            >
              Reach by
            </button>
          </div>
          <button className="flex-1 bg-cream-light rounded-lg px-3 py-2 text-sm text-charcoal-light border border-cream">
            Pick stations
          </button>
        </div>
      </div>
    </div>
  );
}
