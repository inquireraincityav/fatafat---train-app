'use client';

type ProgressStepperProps = {
  steps: number;
  currentStep: number;
};

export function ProgressStepper({ steps, currentStep }: ProgressStepperProps) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: steps }, (_, i) => {
        const isCompleted = i < currentStep;
        const isCurrent = i === currentStep;
        return (
          <div key={i} className="flex items-center gap-2">
            <div
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                isCompleted ? 'bg-success' :
                isCurrent ? 'bg-marigold' :
                'bg-charcoal-light/30'
              }`}
            />
            {i < steps - 1 && (
              <div className={`w-6 h-0.5 ${isCompleted ? 'bg-success' : 'bg-charcoal-light/30'}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}
