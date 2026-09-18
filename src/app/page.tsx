'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';

export default function RootPage() {
  const router = useRouter();
  const { hasOnboarded, hydrated } = useApp();

  useEffect(() => {
    if (!hydrated) return;
    router.replace(hasOnboarded ? '/home' : '/onboarding');
  }, [hydrated, hasOnboarded, router]);

  return (
    <div className="min-h-dvh bg-indigo flex items-center justify-center">
      <div className="animate-pulse">
        <span className="font-serif text-3xl font-bold text-cream-light">Fatafat</span>
      </div>
    </div>
  );
}
