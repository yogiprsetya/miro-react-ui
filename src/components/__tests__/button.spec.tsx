import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Button } from '~/components/ui/button';

describe('Button', () => {
  it('renders with default button semantics', () => {
    render(<Button>Create issue</Button>);

    const button = screen.getByRole('button', { name: 'Create issue' });

    expect(button).toBeInTheDocument();
  });

  it('renders outline and compact variant content', () => {
    render(
      <Button variant="outline" size="sm">
        Secondary action
      </Button>
    );

    const button = screen.getByRole('button', { name: 'Secondary action' });

    expect(button).toBeVisible();
  });

  it('supports disabled state', () => {
    render(<Button disabled>Saving</Button>);

    expect(screen.getByRole('button', { name: 'Saving' })).toBeDisabled();
  });

  it('calls its click handler and receives keyboard focus', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(<Button onClick={onClick}>Create issue</Button>);

    const button = screen.getByRole('button', { name: 'Create issue' });
    button.focus();
    await user.keyboard('{Enter}');

    expect(button).toHaveFocus();
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('does not invoke the click handler when disabled', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(
      <Button disabled onClick={onClick}>
        Saving
      </Button>
    );

    await user.click(screen.getByRole('button', { name: 'Saving' }));

    expect(onClick).not.toHaveBeenCalled();
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

  it('does not provide native disabled behavior when composing an anchor', () => {
    render(
      <Button asChild disabled>
        <a href="/issues/new">Create via link</a>
      </Button>
    );

    const link = screen.getByRole('link', { name: 'Create via link' });

    expect(link).not.toBeDisabled();
    expect(link).toHaveAttribute('disabled');
  });
});
