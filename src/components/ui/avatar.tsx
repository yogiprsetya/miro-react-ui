import * as React from 'react';
import { Avatar as AvatarPrimitive } from 'radix-ui';

import { cn } from '~/lib/utils';

type AvatarProps = React.ComponentProps<typeof AvatarPrimitive.Root> & {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
};

function Avatar({ className, size = 'xl', ...props }: AvatarProps) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      data-size={size}
      className={cn(
        'group/avatar relative flex shrink-0 rounded-full select-none after:absolute after:inset-0 after:rounded-full',
        {
          'size-6': size === 'sm',
          'size-8': size === 'md',
          'size-12': size === 'lg',
          'size-16': size === 'xl',
          'size-24': size === '2xl',
        },
        className
      )}
      {...props}
    />
  );
}

function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn(
        'aspect-square size-full rounded-full object-cover',
        className
      )}
      {...props}
    />
  );
}

function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        'flex size-full items-center justify-center rounded-full bg-neutral-200 text-sm leading-[normal] text-neutral-800',
        [
          'group-data-[size=sm]/avatar:text-[9px]',
          'group-data-[size=md]/avatar:text-xs',
          'group-data-[size=lg]/avatar:text-lg',
          'group-data-[size=xl]/avatar:text-2xl',
          'group-data-[size=2xl]/avatar:text-4xl',
        ],
        className
      )}
      {...props}
    />
  );
}

function AvatarBadge({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="avatar-badge"
      className={cn(
        'bg-primary-600 absolute right-0 bottom-0 z-10 inline-flex items-center justify-center rounded-full text-neutral-50 bg-blend-color ring-2 ring-neutral-500 select-none',
        'group-data-[size=sm]/avatar:size-2 group-data-[size=sm]/avatar:[&>svg]:hidden',
        'group-data-[size=md]/avatar:size-2.5 group-data-[size=md]/avatar:[&>svg]:size-2',
        'group-data-[size=lg]/avatar:size-3 group-data-[size=lg]/avatar:[&>svg]:size-2.5',
        'group-data-[size=xl]/avatar:size-3.5 group-data-[size=xl]/avatar:[&>svg]:size-3',
        'group-data-[size=2xl]/avatar:size-4.5 group-data-[size=2xl]/avatar:[&>svg]:size-4',
        className
      )}
      {...props}
    />
  );
}

type AvatarGroupProps = React.ComponentProps<'div'> & {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
};

function AvatarGroup({ className, size, ...props }: AvatarGroupProps) {
  return (
    <div
      data-slot="avatar-group"
      className={cn(
        'group/avatar-group flex -space-x-2 *:data-[slot=avatar]:ring-2',
        className
      )}
      {...(size && { 'data-size': size })}
      {...props}
    />
  );
}

function AvatarGroupCount({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="avatar-group-count"
      className={cn(
        'bg-primary-800 relative flex size-8 shrink-0 items-center justify-center rounded-full text-sm text-neutral-50 ring-2 [&>svg]:size-4',
        'group-has-data-[size=sm]/avatar-group:size-6 group-has-data-[size=sm]/avatar-group:text-[9px] group-has-data-[size=sm]/avatar-group:[&>svg]:size-3',
        'group-has-data-[size=md]/avatar-group:size-8 group-has-data-[size=md]/avatar-group:[&>svg]:size-4',
        'group-has-data-[size=lg]/avatar-group:size-10 group-has-data-[size=lg]/avatar-group:text-base group-has-data-[size=lg]/avatar-group:[&>svg]:size-5',
        'group-has-data-[size=xl]/avatar-group:size-12 group-has-data-[size=xl]/avatar-group:text-lg group-has-data-[size=xl]/avatar-group:[&>svg]:size-5',
        'group-has-data-[size=2xl]/avatar-group:size-16 group-has-data-[size=2xl]/avatar-group:text-xl group-has-data-[size=2xl]/avatar-group:[&>svg]:size-6',
        className
      )}
      {...props}
    />
  );
}

export {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarBadge,
};
