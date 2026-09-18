'use client';

import { useApp } from '@/context/AppContext';

export function useConfidenceMode() {
  const { confidenceMode, setConfidenceMode } = useApp();
  const isNewRider = confidenceMode === 'new-rider';
  const isCommuter = confidenceMode === 'commuter';
  return { confidenceMode, setConfidenceMode, isNewRider, isCommuter };
}
