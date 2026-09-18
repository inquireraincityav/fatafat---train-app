'use client';

type TabBarProps<T extends string> = {
  tabs: { id: T; label: string }[];
  activeTab: T;
  onChange: (tab: T) => void;
  variant?: 'pill' | 'underline';
};

export function TabBar<T extends string>({
  tabs,
  activeTab,
  onChange,
  variant = 'pill',
}: TabBarProps<T>) {
  if (variant === 'underline') {
    return (
      <div className="flex border-b border-cream">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`flex-1 py-3 text-center text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'text-indigo border-b-2 border-indigo'
                : 'text-charcoal-light'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="flex bg-cream rounded-xl p-1">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`flex-1 py-2.5 px-4 text-sm font-medium rounded-lg transition-all duration-200 ${
            activeTab === tab.id
              ? 'bg-white text-indigo shadow-sm'
              : 'text-charcoal-light hover:text-charcoal'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
