import * as React from 'react';

import { cn } from '~/lib/utils';

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        'flex min-h-16 w-full rounded-lg px-3 py-2 text-base transition-colors outline-none disabled:pointer-events-none disabled:cursor-not-allowed',
        'bg-neutral-50 disabled:bg-neutral-200 disabled:text-neutral-600',
        'text-neutral-900 placeholder:text-neutral-700',
        'focus-visible:border-primary-600 focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-1 aria-invalid:border-error-500 border border-neutral-500',
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
