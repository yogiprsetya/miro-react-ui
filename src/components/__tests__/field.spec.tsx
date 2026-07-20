import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '~/components/ui/field';
import { Input } from '~/components/ui/input';

describe('Field', () => {
  it('composes a labeled input with description and error', () => {
    render(
      <Field>
        <FieldLabel htmlFor="email">Email</FieldLabel>
        <Input
          id="email"
          aria-describedby="email-description email-error"
          aria-invalid="true"
        />
        <FieldDescription id="email-description">
          We will not share your email.
        </FieldDescription>
        <FieldError id="email-error">Enter a valid email address.</FieldError>
      </Field>
    );

    expect(screen.getByLabelText('Email')).toHaveAttribute(
      'aria-describedby',
      'email-description email-error'
    );
    expect(screen.getByRole('alert')).toHaveTextContent(
      'Enter a valid email address.'
    );
  });

  it('supports horizontal orientation', () => {
    const { container } = render(<Field orientation="horizontal" />);

    expect(container.querySelector('[data-slot="field"]')).toHaveAttribute(
      'data-orientation',
      'horizontal'
    );
  });
});
