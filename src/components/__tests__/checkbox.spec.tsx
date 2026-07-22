import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Checkbox } from '~/components/ui/checkbox';

describe('Checkbox', () => {
  it('renders with checkbox semantics', () => {
    render(<Checkbox aria-label="Accept terms" />);

    const checkbox = screen.getByRole('checkbox', { name: 'Accept terms' });

    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toHaveAttribute('data-state', 'unchecked');
    expect(checkbox).toHaveAttribute('value', 'on');
  });

  it('calls onCheckedChange when toggled', () => {
    const onCheckedChange = vi.fn();

    render(
      <Checkbox aria-label="Enable sync" onCheckedChange={onCheckedChange} />
    );

    fireEvent.click(screen.getByRole('checkbox', { name: 'Enable sync' }));

    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it('supports disabled state', () => {
    render(<Checkbox aria-label="Archive board" disabled />);

    expect(
      screen.getByRole('checkbox', { name: 'Archive board' })
    ).toBeDisabled();
  });

  it('does not change state or call back when disabled', async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();

    render(
      <Checkbox
        aria-label="Disabled terms"
        disabled
        onCheckedChange={onCheckedChange}
      />
    );

    const checkbox = screen.getByRole('checkbox', { name: 'Disabled terms' });
    await user.click(checkbox);

    expect(checkbox).toHaveAttribute('data-state', 'unchecked');
    expect(onCheckedChange).not.toHaveBeenCalled();
  });

  it('toggles with the keyboard when focused', async () => {
    const user = userEvent.setup();
    render(<Checkbox aria-label="Keyboard terms" />);

    const checkbox = screen.getByRole('checkbox', { name: 'Keyboard terms' });
    checkbox.focus();
    await user.keyboard(' ');

    expect(checkbox).toHaveAttribute('data-state', 'checked');
  });
});
