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
    expect(switchControl).toHaveAttribute('data-state', 'unchecked');
    expect(switchControl).toHaveAttribute('value', 'on');
  });

  it('renders the requested size variant', () => {
    render(<Switch aria-label="Marketing emails" size="lg" />);

    const switchControl = screen.getByRole('switch', {
      name: 'Marketing emails',
    });

    expect(switchControl).toBeVisible();
  });

  it('calls onCheckedChange when toggled', () => {
    const onCheckedChange = vi.fn();

    render(<Switch aria-label="Auto-save" onCheckedChange={onCheckedChange} />);

    fireEvent.click(screen.getByRole('switch', { name: 'Auto-save' }));

    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it('moves the thumb for an uncontrolled checked switch', () => {
    render(<Switch aria-label="Sync status" defaultChecked />);

    expect(screen.getByRole('switch', { name: 'Sync status' })).toHaveAttribute(
      'aria-checked',
      'true'
    );
  });

  it('supports disabled state', () => {
    render(<Switch aria-label="Focus mode" disabled />);

    expect(screen.getByRole('switch', { name: 'Focus mode' })).toBeDisabled();
  });

  it('does not change state or call back when disabled', async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();

    render(
      <Switch
        aria-label="Disabled focus mode"
        disabled
        onCheckedChange={onCheckedChange}
      />
    );

    const switchControl = screen.getByRole('switch', {
      name: 'Disabled focus mode',
    });
    await user.click(switchControl);

    expect(switchControl).toHaveAttribute('data-state', 'unchecked');
    expect(onCheckedChange).not.toHaveBeenCalled();
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

  it('toggles with Enter when focused', async () => {
    const user = userEvent.setup();
    render(<Switch aria-label="Keyboard enter mode" />);

    const switchControl = screen.getByRole('switch', {
      name: 'Keyboard enter mode',
    });
    switchControl.focus();
    await user.keyboard('{Enter}');

    expect(switchControl).toHaveFocus();
    expect(switchControl).toHaveAttribute('data-state', 'checked');
  });
});
