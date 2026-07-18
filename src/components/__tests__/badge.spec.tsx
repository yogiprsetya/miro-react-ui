import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Badge } from '~/components/ui/badge';

describe('Badge', () => {
  it('renders with default neutral variant', () => {
    render(<Badge>Status</Badge>);

    const badge = screen.getByText('Status');

    expect(badge).toBeInTheDocument();
    expect(badge).toHaveAttribute('data-slot', 'badge');
    expect(badge).toHaveAttribute('data-variant', 'neutral');
    expect(badge.tagName).toBe('SPAN');
  });

  it('applies primary variant', () => {
    render(<Badge variant="primary">Active</Badge>);

    const badge = screen.getByText('Active');

    expect(badge).toHaveAttribute('data-variant', 'primary');
    expect(badge.className).toContain('bg-primary-50');
  });

  it('applies warning variant', () => {
    render(<Badge variant="warning">Pending</Badge>);

    const badge = screen.getByText('Pending');

    expect(badge).toHaveAttribute('data-variant', 'warning');
    expect(badge.className).toContain('bg-warning-50');
  });

  it('applies success variant', () => {
    render(<Badge variant="success">Done</Badge>);

    const badge = screen.getByText('Done');

    expect(badge).toHaveAttribute('data-variant', 'success');
    expect(badge.className).toContain('bg-success-50');
  });

  it('applies error variant', () => {
    render(<Badge variant="error">Failed</Badge>);

    const badge = screen.getByText('Failed');

    expect(badge).toHaveAttribute('data-variant', 'error');
    expect(badge.className).toContain('bg-warning-50');
  });

  it('applies small size', () => {
    render(<Badge size="small">Tiny</Badge>);

    const badge = screen.getByText('Tiny');

    expect(badge.className).toContain('text-xs');
    expect(badge.className).toContain('h-6.5');
  });

  it('applies medium size', () => {
    render(<Badge size="medium">Medium</Badge>);

    const badge = screen.getByText('Medium');

    expect(badge.className).toContain('text-base');
    expect(badge.className).toContain('h-8');
  });

  it('accepts custom className', () => {
    render(<Badge className="custom-class">Custom</Badge>);

    const badge = screen.getByText('Custom');

    expect(badge.className).toContain('custom-class');
    expect(badge).toHaveAttribute('data-slot', 'badge');
  });

  it('renders as child element when asChild is set', () => {
    render(
      <Badge asChild>
        <a href="/status/active">Link badge</a>
      </Badge>
    );

    const link = screen.getByRole('link', { name: 'Link badge' });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/status/active');
    expect(link).toHaveAttribute('data-slot', 'badge');
    expect(link).toHaveAttribute('data-variant', 'neutral');
  });

  it('renders inline with other content', () => {
    render(
      <p>
        Status: <Badge>Open</Badge>
      </p>
    );

    const badge = screen.getByText('Open');
    expect(badge).toBeInTheDocument();
    expect(badge.className).toContain('inline-flex');
  });
});
