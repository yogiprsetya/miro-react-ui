import * as React from 'react';
import { Slot } from 'radix-ui';
import { cn } from '~/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  "group/button inline-flex shrink-0 gap-2 items-center justify-center border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        solid:
          'text-neutral-50 bg-primary-600 hover:bg-primary-700 active:bg-primary-800 disabled:bg-neutral-500',
        outline:
          'bg-transparent border-neutral-500 text-neutral-800 hover:bg-neutral-100 active:text-neutral-700',
      },
      size: {
        '48': 'py-2.5 px-6 rounded-lg',
        '40': 'py-2 px-4 rounded-lg',
        '38': 'py-1.5 px-3 rounded-md',
      },
    },
    defaultVariants: {
      variant: 'solid',
      size: '40',
    },
    compoundVariants: [],
  }
);

type ButtonVariantProps = VariantProps<typeof buttonVariants>;

function Button({
  className,
  variant = 'solid',
  size = '40',
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  ButtonVariantProps & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : 'button';

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button };
