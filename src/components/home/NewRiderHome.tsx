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
      <div className="relative h-72 rounded-2xl overflow-hidden mb-4 bg-[#1a2332]">
        <div className="absolute inset-0">
          <svg width="100%" height="100%" viewBox="0 0 400 360" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="360" fill="#1a2332"/>
            <path d="M180 0 L180 360" stroke="#1B3A6B" strokeWidth="2.5" opacity="0.7"/>
            <path d="M220 0 L200 120 L210 220 L230 360" stroke="#C0392B" strokeWidth="2.5" opacity="0.7"/>
            <path d="M300 40 L260 120 L220 200 L190 260 L160 360" stroke="#27AE60" strokeWidth="2.5" opacity="0.7"/>
            <path d="M80 150 L180 150" stroke="#8B5CF6" strokeWidth="2" opacity="0.5"/>
            <circle cx="180" cy="150" r="6" fill="#E8A63C" stroke="#E8A63C" strokeWidth="3" opacity="0.8"/>
            <circle cx="180" cy="150" r="12" fill="none" stroke="#E8A63C" strokeWidth="1" opacity="0.4"/>
            <circle cx="220" cy="200" r="3" fill="white" opacity="0.5"/>
            <circle cx="180" cy="260" r="3" fill="white" opacity="0.5"/>
          </svg>
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
