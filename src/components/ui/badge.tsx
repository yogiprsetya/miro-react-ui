import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';

import { cn } from '~/lib/utils';

const badgeVariants = cva(
  'group/badge inline-flex py-1 px-2 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-sm border border-transparent font-medium whitespace-nowrap transition-all [&>svg]:pointer-events-none',
  {
    variants: {
      variant: {
        neutral: 'bg-neutral-200 text-neutral-800',
        primary: 'bg-primary-50 text-primary-800',
        warning: 'bg-warning-50 text-warning-800',
        success: 'bg-success-50 text-success-800',
        error: 'bg-warning-50 text-warning-800',
      },
      size: {
        small: 'text-xs h-6.5',
        medium: 'text-base h-8',
      },
    },
    defaultVariants: {
      variant: 'neutral',
    },
  }
);

function Badge({
  className,
  variant = 'neutral',
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'span'> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : 'span';

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export { Badge, badgeVariants };
