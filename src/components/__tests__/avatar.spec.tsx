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
  it('renders with default size (64)', () => {
    render(
      <Avatar>
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    );

    const avatar = screen.getByText('JD').closest('[data-slot="avatar"]');

    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('data-size', '64');
    expect(avatar?.className).toContain('size-16');
  });

  it('renders with size 24', () => {
    render(
      <Avatar size="24">
        <AvatarFallback>A</AvatarFallback>
      </Avatar>
    );

    const avatar = screen.getByText('A').closest('[data-slot="avatar"]');

    expect(avatar).toHaveAttribute('data-size', '24');
    expect(avatar?.className).toContain('size-6');
  });

  it('renders with size 32', () => {
    render(
      <Avatar size="32">
        <AvatarFallback>B</AvatarFallback>
      </Avatar>
    );

    const avatar = screen.getByText('B').closest('[data-slot="avatar"]');

    expect(avatar).toHaveAttribute('data-size', '32');
    expect(avatar?.className).toContain('size-8');
  });

  it('renders with size 48', () => {
    render(
      <Avatar size="48">
        <AvatarFallback>C</AvatarFallback>
      </Avatar>
    );

    const avatar = screen.getByText('C').closest('[data-slot="avatar"]');

    expect(avatar).toHaveAttribute('data-size', '48');
    expect(avatar?.className).toContain('size-12');
  });

  it('renders with size 96', () => {
    render(
      <Avatar size="96">
        <AvatarFallback>L</AvatarFallback>
      </Avatar>
    );

    const avatar = screen.getByText('L').closest('[data-slot="avatar"]');

    expect(avatar).toHaveAttribute('data-size', '96');
    expect(avatar?.className).toContain('size-24');
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
  it('renders with data-slot attribute', () => {
    render(
      <Avatar>
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
    );

    const fallback = screen.getByText('AB');

    expect(fallback).toHaveAttribute('data-slot', 'avatar-fallback');
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
  it('renders with data-slot attribute', () => {
    render(
      <Avatar>
        <AvatarBadge />
      </Avatar>
    );

    const badge = document.querySelector('[data-slot="avatar-badge"]');

    expect(badge).toBeInTheDocument();
    expect(badge).toHaveAttribute('data-slot', 'avatar-badge');
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
  it('renders with data-slot attribute', () => {
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

    expect(group).toBeInTheDocument();
    expect(group).toHaveAttribute('data-slot', 'avatar-group');
  });

  it('sets data-size when size is provided', () => {
    render(
      <AvatarGroup size="48">
        <Avatar size="48">
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
      </AvatarGroup>
    );

    const group = screen.getByText('A').closest('[data-slot="avatar-group"]');

    expect(group).toHaveAttribute('data-size', '48');
  });

  it('does not set data-size when size is omitted', () => {
    render(
      <AvatarGroup>
        <Avatar>
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
      </AvatarGroup>
    );

    const group = screen.getByText('A').closest('[data-slot="avatar-group"]');

    expect(group).not.toHaveAttribute('data-size');
  });
});

describe('AvatarGroupCount', () => {
  it('renders with data-slot attribute', () => {
    render(
      <AvatarGroup>
        <AvatarGroupCount>+3</AvatarGroupCount>
      </AvatarGroup>
    );

    const count = screen.getByText('+3');

    expect(count).toHaveAttribute('data-slot', 'avatar-group-count');
  });
});
