'use client';

import { BottomNav } from './BottomNav';

type AppShellProps = {
  children: React.ReactNode;
  hideNav?: boolean;
};

export function AppShell({ children, hideNav = false }: AppShellProps) {
  return (
    <div className="min-h-dvh bg-cream flex flex-col">
      <main className={`flex-1 ${hideNav ? '' : 'pb-[64px]'}`}>
        {children}
      </main>
      {!hideNav && <BottomNav />}
    </div>
  );
}
