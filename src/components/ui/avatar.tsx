import * as React from 'react';
import { Avatar as AvatarPrimitive } from 'radix-ui';

import { cn } from '~/lib/utils';

type AvatarProps = React.ComponentProps<typeof AvatarPrimitive.Root> & {
  size?: '24' | '32' | '48' | '64' | '96';
};

function Avatar({ className, size = '64', ...props }: AvatarProps) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      data-size={size}
      className={cn(
        'group/avatar relative flex shrink-0 rounded-full select-none after:absolute after:inset-0 after:rounded-full after:mix-blend-darken',
        {
          'size-6': size === '24',
          'size-8': size === '32',
          'size-12': size === '48',
          'size-16': size === '64',
          'size-24': size === '96',
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
          'group-data-[size=24]/avatar:text-[9px]',
          'group-data-[size=32]/avatar:text-xs',
          'group-data-[size=48]/avatar:text-lg',
          'group-data-[size=64]/avatar:text-2xl',
          'group-data-[size=96]/avatar:text-4xl',
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
        'group-data-[size=24]/avatar:size-2 group-data-[size=24]/avatar:[&>svg]:hidden',
        'group-data-[size=32]/avatar:size-2.5 group-data-[size=32]/avatar:[&>svg]:size-2',
        'group-data-[size=48]/avatar:size-3 group-data-[size=48]/avatar:[&>svg]:size-2.5',
        'group-data-[size=64]/avatar:size-3.5 group-data-[size=64]/avatar:[&>svg]:size-3',
        'group-data-[size=96]/avatar:size-4.5 group-data-[size=96]/avatar:[&>svg]:size-4',
        className
      )}
      {...props}
    />
  );
}

type AvatarGroupProps = React.ComponentProps<'div'> & {
  size?: '24' | '32' | '48' | '64' | '96';
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
        'group-has-data-[size=24]/avatar-group:size-6 group-has-data-[size=24]/avatar-group:text-[9px] group-has-data-[size=24]/avatar-group:[&>svg]:size-3',
        'group-has-data-[size=32]/avatar-group:size-8 group-has-data-[size=32]/avatar-group:[&>svg]:size-4',
        'group-has-data-[size=48]/avatar-group:size-10 group-has-data-[size=48]/avatar-group:text-base group-has-data-[size=48]/avatar-group:[&>svg]:size-5',
        'group-has-data-[size=64]/avatar-group:size-12 group-has-data-[size=64]/avatar-group:text-lg group-has-data-[size=64]/avatar-group:[&>svg]:size-5',
        'group-has-data-[size=96]/avatar-group:size-16 group-has-data-[size=96]/avatar-group:text-xl group-has-data-[size=96]/avatar-group:[&>svg]:size-6',
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
