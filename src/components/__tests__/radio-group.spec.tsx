import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { RadioGroup, RadioGroupItem } from '~/components/ui/radio-group';

describe('RadioGroup', () => {
  it('renders radio group semantics', () => {
    render(
      <RadioGroup defaultValue="board-view" aria-label="View mode">
        <RadioGroupItem value="board-view" aria-label="Board view" />
        <RadioGroupItem value="list-view" aria-label="List view" />
      </RadioGroup>
    );

    const group = screen.getByRole('radiogroup', { name: 'View mode' });
    const boardView = screen.getByRole('radio', { name: 'Board view' });

    expect(group).toBeInTheDocument();
    expect(group).toHaveAttribute('data-slot', 'radio-group');
    expect(boardView).toHaveAttribute('data-slot', 'radio-group-item');
    expect(boardView).toHaveAttribute('data-size', 'md');
    expect(boardView).toHaveAttribute('data-state', 'checked');
  });

  it('applies the requested size variant', () => {
    render(
      <RadioGroup defaultValue="notifications" aria-label="Notification level">
        <RadioGroupItem
          value="notifications"
          size="lg"
          aria-label="All notifications"
        />
      </RadioGroup>
    );

    const radio = screen.getByRole('radio', { name: 'All notifications' });

    expect(radio).toHaveAttribute('data-size', 'lg');
    expect(radio.className).toContain('size-7');
  });

  it('calls onValueChange when selection changes', () => {
    const onValueChange = vi.fn();

    render(
      <RadioGroup aria-label="Density" onValueChange={onValueChange}>
        <RadioGroupItem value="comfortable" aria-label="Comfortable" />
        <RadioGroupItem value="compact" aria-label="Compact" />
      </RadioGroup>
    );

    fireEvent.click(screen.getByRole('radio', { name: 'Compact' }));

    expect(onValueChange).toHaveBeenCalledWith('compact');
  });

  it('supports disabled state', () => {
    render(
      <RadioGroup defaultValue="private" aria-label="Privacy">
        <RadioGroupItem value="private" aria-label="Private" disabled />
      </RadioGroup>
    );

    expect(screen.getByRole('radio', { name: 'Private' })).toBeDisabled();
  });
});
