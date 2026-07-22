import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
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

  it('accepts custom className', () => {
    render(
      <Avatar className="custom-class">
        <AvatarFallback>X</AvatarFallback>
      </Avatar>
    );

    const avatar = screen.getByText('X').closest('[data-slot="avatar"]');

    expect(avatar?.className).toContain('custom-class');
  });
});

describe('AvatarImage', () => {
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
    expect(fallback).toHaveAttribute('data-slot', 'avatar-fallback');
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

  it('accepts custom className', () => {
    render(
      <Avatar>
        <AvatarFallback className="custom-fallback">AB</AvatarFallback>
      </Avatar>
    );

    const fallback = screen.getByText('AB');

    expect(fallback.className).toContain('custom-fallback');
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

  it('accepts custom className', () => {
    render(
      <Avatar>
        <AvatarBadge className="custom-badge" />
      </Avatar>
    );

    const badge = document.querySelector('[data-slot="avatar-badge"]');

    expect(badge?.className).toContain('custom-badge');
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
