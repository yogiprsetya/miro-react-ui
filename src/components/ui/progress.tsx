import * as React from 'react';
import { Progress as ProgressPrimitive } from 'radix-ui';
import { cn } from '~/lib/utils';

type ProgressProps = Omit<
  React.ComponentProps<typeof ProgressPrimitive.Root>,
  'aria-valuemin' | 'aria-valuemax' | 'aria-valuenow'
>;

function Progress({ className, value, ...props }: ProgressProps) {
  const clampedValue = Math.min(100, Math.max(0, value ?? 0));
  const translation = -(100 - clampedValue);
  const ariaValueNow = value === undefined ? undefined : clampedValue;

  return (
    <ProgressPrimitive.Root
      {...props}
      data-slot="progress"
      className={cn(
        'relative flex h-2 w-full items-center overflow-x-hidden rounded-full bg-neutral-300',
        className
      )}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={ariaValueNow}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="bg-primary-600 size-full flex-1 transition-all"
        style={{
          transform: `translateX(${translation}%)`,
        }}
      />
    </ProgressPrimitive.Root>
  );
}

export type { ProgressProps };
export { Progress };
