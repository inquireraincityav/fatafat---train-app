'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';

export default function RootPage() {
  const router = useRouter();
  const { hasOnboarded } = useApp();

  useEffect(() => {
    if (hasOnboarded) {
      router.replace('/home');
    } else {
      router.replace('/onboarding');
    }
  }, [hasOnboarded, router]);

  return null;
}
