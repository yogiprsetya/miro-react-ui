import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarBadge,
  AvatarGroup,
  AvatarGroupCount,
} from '~/components/ui/avatar';

describe('Avatar', () => {
  it('renders with default size (xl)', () => {
    render(
      <Avatar>
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    );

    const avatar = screen.getByText('JD').closest('[data-slot="avatar"]');

    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('data-size', 'xl');
  });

  it('renders with size sm', () => {
    render(
      <Avatar size="sm">
        <AvatarFallback>A</AvatarFallback>
      </Avatar>
    );

    const avatar = screen.getByText('A').closest('[data-slot="avatar"]');

    expect(avatar).toHaveAttribute('data-size', 'sm');
  });

  it('renders with size md', () => {
    render(
      <Avatar size="md">
        <AvatarFallback>B</AvatarFallback>
      </Avatar>
    );

    const avatar = screen.getByText('B').closest('[data-slot="avatar"]');

    expect(avatar).toHaveAttribute('data-size', 'md');
  });

  it('renders with size lg', () => {
    render(
      <Avatar size="lg">
        <AvatarFallback>C</AvatarFallback>
      </Avatar>
    );

    const avatar = screen.getByText('C').closest('[data-slot="avatar"]');

    expect(avatar).toHaveAttribute('data-size', 'lg');
  });

  it('renders with size 2xl', () => {
    render(
      <Avatar size="2xl">
        <AvatarFallback>L</AvatarFallback>
      </Avatar>
    );

    const avatar = screen.getByText('L').closest('[data-slot="avatar"]');

    expect(avatar).toHaveAttribute('data-size', '2xl');
  });
});

describe('AvatarImage', () => {
  it('shows the image after it loads successfully', () => {
    const listeners = new Map<string, (event?: unknown) => void>();
    const image = {
      complete: false,
      naturalWidth: 0,
      addEventListener: (type: string, listener: (event?: unknown) => void) => {
        listeners.set(type, listener);
      },
      removeEventListener: () => {},
      set src(_value: string) {},
    } as unknown as HTMLImageElement;
    class MockImage {
      get complete() {
        return image.complete;
      }
      get naturalWidth() {
        return image.naturalWidth;
      }
      addEventListener = image.addEventListener;
      removeEventListener = image.removeEventListener;
      set src(value: string) {
        image.src = value;
      }
    }
    vi.spyOn(window, 'Image').mockImplementation(
      MockImage as unknown as typeof window.Image
    );

    const onLoadingStatusChange = vi.fn();

    render(
      <Avatar>
        <AvatarImage
          src="/photo.jpg"
          alt="User photo"
          onLoadingStatusChange={onLoadingStatusChange}
        />
        <AvatarFallback>UP</AvatarFallback>
      </Avatar>
    );

    Object.assign(image, { complete: true, naturalWidth: 1 });
    listeners.get('load')?.({ currentTarget: image } as never);

    return waitFor(() => {
      expect(onLoadingStatusChange).toHaveBeenCalledWith('loaded');
    });
  });

  it('shows fallback when image is not loaded (jsdom limitation)', () => {
    render(
      <Avatar>
        <AvatarImage src="/photo.jpg" alt="User photo" />
        <AvatarFallback>UP</AvatarFallback>
      </Avatar>
    );

    // In jsdom, images never "load" so Radix Avatar shows the fallback.
    // This verifies AvatarImage + AvatarFallback work together.
    const fallback = screen.getByText('UP');

    expect(fallback).toBeInTheDocument();
  });

  it('keeps the fallback visible when the image fails to load', () => {
    const listeners = new Map<string, (event?: unknown) => void>();
    const image = {
      complete: false,
      naturalWidth: 0,
      addEventListener: (type: string, listener: (event?: unknown) => void) => {
        listeners.set(type, listener);
      },
      removeEventListener: () => {},
      set src(_value: string) {},
    } as unknown as HTMLImageElement;
    class MockImage {
      get complete() {
        return image.complete;
      }
      get naturalWidth() {
        return image.naturalWidth;
      }
      addEventListener = image.addEventListener;
      removeEventListener = image.removeEventListener;
      set src(value: string) {
        image.src = value;
      }
    }
    vi.spyOn(window, 'Image').mockImplementation(
      MockImage as unknown as typeof window.Image
    );

    render(
      <Avatar>
        <AvatarImage src="/missing-photo.jpg" alt="Missing user photo" />
        <AvatarFallback>UP</AvatarFallback>
      </Avatar>
    );

    listeners.get('error')?.();

    expect(screen.getByText('UP')).toBeVisible();
    expect(screen.queryByAltText('Missing user photo')).not.toBeInTheDocument();

    vi.restoreAllMocks();
  });
});

describe('AvatarFallback', () => {
  it('renders fallback content', () => {
    render(
      <Avatar>
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
    );

    const fallback = screen.getByText('AB');

    expect(fallback).toBeVisible();
  });
});

describe('AvatarBadge', () => {
  it('renders the decorative badge element', () => {
    render(
      <Avatar>
        <AvatarBadge />
      </Avatar>
    );

    const badge = document.querySelector('[data-slot="avatar-badge"]');

    expect(badge).toBeInTheDocument();
  });
});

describe('AvatarGroup', () => {
  it('renders grouped avatars', () => {
    render(
      <AvatarGroup>
        <Avatar>
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>B</AvatarFallback>
        </Avatar>
      </AvatarGroup>
    );

    const group = screen.getByText('A').closest('[data-slot="avatar-group"]');

    expect(group).toBeVisible();
  });

  it('synchronizes the group and child avatar size', () => {
    render(
      <AvatarGroup size="sm">
        <Avatar size="lg">
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
      </AvatarGroup>
    );

    const group = screen.getByText('A').closest('[data-slot="avatar-group"]');
    const avatar = screen.getByText('A').closest('[data-slot="avatar"]');

    expect(group).toHaveAttribute('data-size', 'sm');
    expect(avatar).toHaveAttribute('data-size', 'sm');
  });

  it('uses the default xl size for the group and child avatar', () => {
    render(
      <AvatarGroup>
        <Avatar>
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
      </AvatarGroup>
    );

    const group = screen.getByText('A').closest('[data-slot="avatar-group"]');
    const avatar = screen.getByText('A').closest('[data-slot="avatar"]');

    expect(group).toHaveAttribute('data-size', 'xl');
    expect(avatar).toHaveAttribute('data-size', 'xl');
  });
});

describe('AvatarGroupCount', () => {
  it('renders the group count', () => {
    render(
      <AvatarGroup size="lg">
        <AvatarGroupCount>+3</AvatarGroupCount>
      </AvatarGroup>
    );

    const count = screen.getByText('+3');

    expect(count).toBeVisible();
    expect(count).toHaveAttribute('data-size', 'lg');
  });
});
