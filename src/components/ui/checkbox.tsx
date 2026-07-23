import * as React from 'react';
import { Checkbox as CheckboxPrimitive } from 'radix-ui';

import { cn } from '~/lib/utils';
import { CheckIcon } from 'lucide-react';

type CheckboxProps = React.ComponentProps<typeof CheckboxPrimitive.Root> & {
  size?: 'sm' | 'md' | 'lg';
};

function Checkbox({ className, size = 'md', ...props }: CheckboxProps) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      data-size={size}
      className={cn(
        'focus-visible:ring-focus relative flex shrink-0 items-center justify-center border border-transparent transition-colors outline-none after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:ring-2 focus-visible:ring-offset-2',
        'disabled:cursor-not-allowed',
        'enabled:data-[state=checked]:bg-primary-600 enabled:data-[state=checked]:hover:bg-primary-700',
        'enabled:data-[state=unchecked]:border-neutral-500 enabled:data-[state=unchecked]:bg-neutral-50 enabled:data-[state=unchecked]:hover:border-neutral-600',
        'data-disabled:cursor-not-allowed data-disabled:bg-neutral-400',
        {
          'size-5 rounded-sm': size === 'sm',
          'size-6 rounded-[5px]': size === 'md',
          'size-7 rounded-md': size === 'lg',
        },
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className={cn(
          'grid place-content-center transition-none',
          props.disabled ? 'text-neutral-600' : 'text-neutral-50',
          {
            '[&>svg]:size-4': size === 'sm',
            '[&>svg]:size-5': size === 'md',
            '[&>svg]:size-6': size === 'lg',
          }
        )}
      >
        <CheckIcon />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
