import * as React from 'react';

import { cn } from '~/lib/utils';

/**
 * Layout primitive for composing a label, control, description, and error.
 * Consumers own the control IDs and `aria-describedby` association.
 */
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

interface FieldErrorProps extends React.ComponentProps<'p'> {
  /** Add alert semantics when the error should be announced immediately. */
  announce?: boolean;
}

function FieldError({
  announce = false,
  className,
  ...props
}: FieldErrorProps) {
  return (
    <p
      {...(announce ? { role: 'alert' } : {})}
      data-slot="field-error"
      className={cn('text-error-600 text-sm', className)}
      {...props}
    />
  );
}

export type { FieldErrorProps, FieldProps };
export { Field, FieldDescription, FieldError, FieldLabel };
