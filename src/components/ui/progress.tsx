import * as React from 'react';
import { Progress as ProgressPrimitive } from 'radix-ui';
import { cn } from '~/lib/utils';

function Progress({
  className,
  value,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
  const clampedValue = Math.min(100, Math.max(0, value ?? 0));
  const translation = clampedValue === 100 ? 0 : 100 - clampedValue;

  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        'relative flex h-2 w-full items-center overflow-x-hidden rounded-full bg-neutral-300',
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="bg-primary-600 size-full flex-1 transition-all"
        style={{
          transform: `translateX(${translation === 0 ? 0 : `-${translation}`}%)`,
        }}
      />
    </ProgressPrimitive.Root>
  );
}

export { Progress };
