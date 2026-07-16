import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';

describe('Input', () => {
  it('renders with input semantics', () => {
    render(<Input aria-label="Board name" placeholder="Untitled board" />);

    const input = screen.getByRole('textbox', { name: 'Board name' });

    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('data-slot', 'input');
    expect(input).toHaveAttribute('placeholder', 'Untitled board');
  });

  it('supports labeled usage with Label', () => {
    render(
      <div>
        <Label htmlFor="board-title">Board title</Label>
        <Input id="board-title" />
      </div>
    );

    expect(screen.getByLabelText('Board title')).toHaveAttribute(
      'id',
      'board-title'
    );
  });

  it('supports non-text input types', () => {
    render(<Input aria-label="Due date" type="date" />);

    expect(screen.getByLabelText('Due date')).toHaveAttribute('type', 'date');
  });

  it('supports disabled and invalid states', () => {
    render(<Input aria-label="Workspace slug" disabled aria-invalid="true" />);

    const input = screen.getByLabelText('Workspace slug');

    expect(input).toBeDisabled();
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input.className).toContain('disabled:cursor-not-allowed');
    expect(input.className).toContain('aria-invalid:border-error-500');
  });
});
