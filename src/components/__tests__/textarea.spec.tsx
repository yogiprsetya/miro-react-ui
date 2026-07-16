import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Label } from '~/components/ui/label';
import { Textarea } from '~/components/ui/textarea';

describe('Textarea', () => {
  it('renders with textarea semantics', () => {
    const { getByRole } = render(
      <Textarea
        aria-label="Board description"
        placeholder="Describe the board"
      />
    );

    const textarea = getByRole('textbox', { name: 'Board description' });

    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveAttribute('data-slot', 'textarea');
    expect(textarea).toHaveAttribute('placeholder', 'Describe the board');
  });

  it('supports labeled usage with Label', () => {
    const { getByLabelText } = render(
      <div>
        <Label htmlFor="board-description">Description</Label>
        <Textarea id="board-description" />
      </div>
    );

    expect(getByLabelText('Description')).toHaveAttribute(
      'id',
      'board-description'
    );
  });

  it('supports disabled and invalid states', () => {
    const { getByLabelText } = render(
      <Textarea aria-label="Status" disabled aria-invalid="true" />
    );

    const textarea = getByLabelText('Status');

    expect(textarea).toBeDisabled();
    expect(textarea).toHaveAttribute('aria-invalid', 'true');
    expect(textarea.className).toContain('disabled:cursor-not-allowed');
    expect(textarea.className).toContain('aria-invalid:border-error-500');
  });
});
