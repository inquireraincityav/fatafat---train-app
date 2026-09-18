'use client';

type ToggleProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  description?: string;
};

export function Toggle({ checked, onChange, label, description }: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="flex items-center justify-between w-full py-3 text-left"
    >
      <div className="flex-1 mr-4">
        {label && <div className="text-base font-medium text-charcoal">{label}</div>}
        {description && <div className="text-sm text-charcoal-light mt-0.5">{description}</div>}
      </div>
      <div
        className={`relative w-12 h-7 rounded-full transition-colors duration-200 ${
          checked ? 'bg-marigold' : 'bg-charcoal-light/30'
        }`}
      >
        <div
          className={`absolute top-0.5 w-6 h-6 rounded-full bg-white shadow transition-transform duration-200 ${
            checked ? 'translate-x-5.5' : 'translate-x-0.5'
          }`}
        />
      </div>
    </button>
  );
}
