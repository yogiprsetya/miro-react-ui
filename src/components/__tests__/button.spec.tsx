import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Button } from '~/components/ui/button';

describe('Button', () => {
  it('renders with default button semantics', () => {
    render(<Button>Create issue</Button>);

    const button = screen.getByRole('button', { name: 'Create issue' });

    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('data-slot', 'button');
    expect(button).toHaveAttribute('data-variant', 'solid');
    expect(button).toHaveAttribute('data-size', '40');
  });

  it('applies outline and compact variants', () => {
    render(
      <Button variant="outline" size="38">
        Secondary action
      </Button>
    );

    const button = screen.getByRole('button', { name: 'Secondary action' });

    expect(button).toHaveAttribute('data-variant', 'outline');
    expect(button).toHaveAttribute('data-size', '38');
    expect(button.className).toContain('border-neutral-500');
    expect(button.className).toContain('rounded-md');
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
    expect(link).toHaveAttribute('data-slot', 'button');
    expect(link).toHaveAttribute('data-variant', 'solid');
    expect(link).toHaveAttribute('data-size', '40');
  });
});
