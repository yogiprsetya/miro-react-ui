import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Switch } from '~/components/ui/switch';

describe('Switch', () => {
  it('renders with switch semantics', () => {
    render(<Switch aria-label="Email notifications" />);

    const switchControl = screen.getByRole('switch', {
      name: 'Email notifications',
    });

    expect(switchControl).toBeInTheDocument();
    expect(switchControl).toHaveAttribute('data-slot', 'switch');
    expect(switchControl).toHaveAttribute('data-size', 'md');
    expect(switchControl).toHaveAttribute('data-state', 'unchecked');
    expect(switchControl).toHaveAttribute('value', 'on');
  });

  it('applies the requested size variant', () => {
    render(<Switch aria-label="Marketing emails" size="lg" />);

    const switchControl = screen.getByRole('switch', {
      name: 'Marketing emails',
    });

    expect(switchControl).toHaveAttribute('data-size', 'lg');
    expect(switchControl.className).toContain('h-7');
    expect(switchControl.className).toContain('w-12.5');
  });

  it('calls onCheckedChange when toggled', () => {
    const onCheckedChange = vi.fn();

    render(<Switch aria-label="Auto-save" onCheckedChange={onCheckedChange} />);

    fireEvent.click(screen.getByRole('switch', { name: 'Auto-save' }));

    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it('moves the thumb for an uncontrolled checked switch', () => {
    render(<Switch aria-label="Sync status" defaultChecked />);

    const thumb = screen
      .getByRole('switch', { name: 'Sync status' })
      .querySelector('[data-slot="switch-thumb"]');

    expect(thumb).toHaveAttribute('data-state', 'checked');
    expect(thumb?.className).toContain('data-[state=checked]:translate-x');
  });

  it('supports disabled state', () => {
    render(<Switch aria-label="Focus mode" disabled />);

    expect(screen.getByRole('switch', { name: 'Focus mode' })).toBeDisabled();
  });

  it('toggles with Space when focused', async () => {
    const user = userEvent.setup();
    render(<Switch aria-label="Keyboard focus mode" />);

    const switchControl = screen.getByRole('switch', {
      name: 'Keyboard focus mode',
    });
    switchControl.focus();
    await user.keyboard(' ');

    expect(switchControl).toHaveAttribute('data-state', 'checked');
  });
});
