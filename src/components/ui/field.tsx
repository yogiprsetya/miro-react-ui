import * as React from 'react';

import { cn } from '~/lib/utils';

interface FieldProps extends React.ComponentProps<'div'> {
  orientation?: 'vertical' | 'horizontal';
}

function Field({ className, orientation = 'vertical', ...props }: FieldProps) {
  return (
    <div
      data-slot="field"
      data-orientation={orientation}
      className={cn(
        'flex gap-2',
        orientation === 'horizontal' ? 'items-start' : 'flex-col',
        className
      )}
      {...props}
    />
  );
}

function FieldLabel({ className, ...props }: React.ComponentProps<'label'>) {
  return (
    <label
      data-slot="field-label"
      className={cn('text-sm font-medium text-neutral-800', className)}
      {...props}
    />
  );
}

function FieldDescription({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p
      data-slot="field-description"
      className={cn('text-sm text-neutral-600', className)}
      {...props}
    />
  );
}

function FieldError({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p
      role="alert"
      data-slot="field-error"
      className={cn('text-error-600 text-sm', className)}
      {...props}
    />
  );
}

export type { FieldProps };
export { Field, FieldDescription, FieldError, FieldLabel };
