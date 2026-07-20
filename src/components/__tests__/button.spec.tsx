import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Button } from '~/components/ui/button';

describe('Button', () => {
  it('renders with default button semantics', () => {
    render(<Button>Create issue</Button>);

    const button = screen.getByRole('button', { name: 'Create issue' });

    expect(button).toBeInTheDocument();
  });

  it('applies outline and compact variants', () => {
    render(
      <Button variant="outline" size="sm">
        Secondary action
      </Button>
    );

    const button = screen.getByRole('button', { name: 'Secondary action' });

    expect(button).toHaveAttribute('data-variant', 'outline');
    expect(button).toHaveAttribute('data-size', 'sm');
  });

  it('supports disabled state', () => {
    render(<Button disabled>Saving</Button>);

    expect(screen.getByRole('button', { name: 'Saving' })).toBeDisabled();
  });

  it('renders child element when asChild is set', () => {
    render(
      <Button asChild>
        <a href="/issues/new">Create via link</a>
      </Button>
    );

    const link = screen.getByRole('link', { name: 'Create via link' });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/issues/new');
  });
});
