import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Badge } from '~/components/ui/badge';

describe('Badge', () => {
  it('renders with default neutral variant', () => {
    render(<Badge>Status</Badge>);

    const badge = screen.getByText('Status');

    expect(badge).toBeInTheDocument();
    expect(badge.tagName).toBe('SPAN');
  });

  it.each([
    ['primary', 'Active'],
    ['warning', 'Pending'],
    ['success', 'Done'],
    ['error', 'Failed'],
  ] as const)('renders the %s variant content', (variant, content) => {
    render(<Badge variant={variant}>{content}</Badge>);
    expect(screen.getByText(content)).toBeVisible();
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
  });

  it.each([
    ['sm', 'Small'],
    ['md', 'Medium'],
  ] as const)('supports the shared %s size vocabulary', (size, content) => {
    render(<Badge size={size}>{content}</Badge>);

    expect(screen.getByText(content)).toHaveAttribute('data-size', size);
  });
});
