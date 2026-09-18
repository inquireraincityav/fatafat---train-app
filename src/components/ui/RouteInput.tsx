'use client';

type RouteInputProps = {
  from: string;
  to: string;
  onFromClick: () => void;
  onToClick: () => void;
  fromPlaceholder?: string;
  toPlaceholder?: string;
};

export function RouteInput({
  from,
  to,
  onFromClick,
  onToClick,
  fromPlaceholder = 'Starting station',
  toPlaceholder = 'Destination station',
}: RouteInputProps) {
  return (
    <div className="bg-cream-light rounded-xl border border-cream overflow-hidden">
      <button
        onClick={onFromClick}
        className="w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-cream/50 transition-colors"
      >
        <div className="w-3 h-3 rounded-full border-2 border-charcoal-light" />
        <span className={from ? 'text-charcoal font-medium' : 'text-charcoal-light'}>
          {from || fromPlaceholder}
        </span>
      </button>
      <div className="mx-4 border-t border-cream" />
      <button
        onClick={onToClick}
        className="w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-cream/50 transition-colors"
      >
        <div className="w-3 h-3 rounded-full border-2 border-marigold bg-marigold/20" />
        <span className={to ? 'text-charcoal font-medium' : 'text-charcoal-light'}>
          {to || toPlaceholder}
        </span>
      </button>
    </div>
  );
}
