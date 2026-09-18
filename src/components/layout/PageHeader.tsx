'use client';

import { useRouter } from 'next/navigation';

type PageHeaderProps = {
  title: string;
  subtitle?: string;
  showSettings?: boolean;
  showBack?: boolean;
  rightElement?: React.ReactNode;
};

export function PageHeader({ title, subtitle, showSettings = true, showBack = false, rightElement }: PageHeaderProps) {
  const router = useRouter();

  return (
    <header className="flex items-start justify-between px-4 pt-12 pb-3">
      <div className="flex items-center gap-3">
        {showBack && (
          <button onClick={() => router.back()} className="p-1 -ml-1">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1F3A5F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
          </button>
        )}
        <div>
          <h1 className="font-serif text-3xl font-bold text-indigo">{title}</h1>
          {subtitle && <p className="text-sm text-charcoal-light mt-0.5">{subtitle}</p>}
        </div>
      </div>
      {rightElement}
      {showSettings && !rightElement && (
        <button
          onClick={() => router.push('/settings')}
          className="p-2 mt-1"
          aria-label="Settings"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3D3A34" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" />
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
          </svg>
        </button>
      )}
    </header>
  );
}
