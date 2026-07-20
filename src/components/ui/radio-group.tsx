import * as React from 'react';
import { RadioGroup as RadioGroupPrimitive } from 'radix-ui';

import { cn } from '~/lib/utils';

function RadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn('grid w-full gap-2', className)}
      {...props}
    />
  );
}

type RadioGroupItemProps = React.ComponentProps<
  typeof RadioGroupPrimitive.Item
> & {
  size?: 'sm' | 'md' | 'lg';
};

function RadioGroupItem({
  className,
  size = 'md',
  ...props
}: RadioGroupItemProps) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      data-size={size}
      className={cn(
        'relative flex shrink-0 items-center justify-center rounded-full border border-transparent transition-colors outline-none after:absolute after:-inset-x-3 after:-inset-y-2',
        'disabled:cursor-not-allowed',
        'enabled:data-[state=checked]:bg-primary-600 enabled:data-[state=checked]:hover:bg-primary-700',
        'enabled:data-[state=unchecked]:border-neutral-500 enabled:data-[state=unchecked]:bg-neutral-50 enabled:data-[state=unchecked]:hover:border-neutral-600',
        'data-disabled:cursor-not-allowed data-disabled:bg-neutral-400',
        {
          'size-4': size === 'sm',
          'size-6': size === 'md',
          'size-7': size === 'lg',
        },
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="flex items-center justify-center"
      >
        <span
          className={cn(
            'rounded-full',
            props.disabled ? 'bg-neutral-600' : 'bg-neutral-50',
            {
              'size-1.5': size === 'sm',
              'size-2.5': size === 'md',
              'size-3': size === 'lg',
            }
          )}
        />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
}

export { RadioGroup, RadioGroupItem };
