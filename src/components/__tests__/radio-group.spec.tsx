import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { RadioGroup, RadioGroupItem } from '~/components/ui/radio-group';

describe('RadioGroup', () => {
  it.each(['sm', 'md', 'lg'] as const)('supports item size %s', (size) => {
    render(
      <RadioGroup aria-label={`${size} options`}>
        <RadioGroupItem value="one" aria-label="One" size={size} />
      </RadioGroup>
    );

    expect(screen.getByRole('radio', { name: 'One' })).toHaveAttribute(
      'data-size',
      size
    );
  });
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
    expect(boardView).toHaveAttribute('data-state', 'checked');
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
    const onValueChange = vi.fn();

    render(
      <RadioGroup
        defaultValue="private"
        aria-label="Privacy"
        onValueChange={onValueChange}
      >
        <RadioGroupItem value="private" aria-label="Private" disabled />
      </RadioGroup>
    );

    const radio = screen.getByRole('radio', { name: 'Private' });
    fireEvent.click(radio);

    expect(radio).toBeDisabled();
    expect(radio).toHaveAttribute('aria-checked', 'true');
    expect(onValueChange).not.toHaveBeenCalled();
  });
});
