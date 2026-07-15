import * as React from 'react';
import { Switch as SwitchPrimitive } from 'radix-ui';

import { cn } from '~/lib/utils';

type SwitchProp = React.ComponentProps<typeof SwitchPrimitive.Root> & {
  size?: 'sm' | 'md' | 'lg';
};

function Switch({ className, size = 'md', ...props }: SwitchProp) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      className={cn(
        'relative inline-flex shrink-0 items-center rounded-full border border-transparent transition-all outline-none after:absolute',
        'after:-inset-x-3 after:-inset-y-2',
        'enabled:data-[state=checked]:bg-primary-600 enabled:data-[state=checked]:hover:bg-primary-700',
        'enabled:data-[state=unchecked]:bg-neutral-400 enabled:data-[state=unchecked]:hover:bg-neutral-500',
        'data-disabled:cursor-not-allowed data-disabled:bg-neutral-400',
        {
          'h-4 w-6.5': size === 'sm',
          'h-5 w-8.5': size === 'md',
          'h-7 w-12.5': size === 'lg',
        },
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          'pointer-events-none block rounded-full bg-neutral-50 ring-0 transition-transform',
          props.checked
            ? 'translate-x-[calc(100%-1px)]'
            : 'data-[state=unchecked]:translate-x-0',
          {
            'size-3': size === 'sm',
            'size-4': size === 'md',
            'size-6': size === 'lg',
          }
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
