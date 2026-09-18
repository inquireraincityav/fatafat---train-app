'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { RouteInput } from '@/components/ui/RouteInput';

export function NewRiderHome() {
  const router = useRouter();
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  return (
    <div className="px-4">
      <div className="relative h-72 rounded-2xl overflow-hidden mb-4 bg-indigo">
        <div className="absolute inset-0 flex items-center justify-center text-cream-light/50 text-sm">
          Map loads with Carto API key
        </div>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <button onClick={() => router.back()} className="p-1">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1F3A5F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
        </button>
        <h2 className="font-serif text-xl font-bold text-indigo">Where to?</h2>
      </div>

      <RouteInput
        from={from}
        to={to}
        onFromClick={() => router.push('/station-picker?field=from')}
        onToClick={() => router.push('/station-picker?field=to')}
      />

      <p className="text-center text-sm text-charcoal-light mt-4">
        Or tap the map above to explore the network
      </p>
    </div>
  );
}
