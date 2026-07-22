import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '~/components/system/field';
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
        <FieldError id="email-error" announce>
          Enter a valid email address.
        </FieldError>
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
    render(
      <Field orientation="horizontal">
        <FieldLabel htmlFor="board-title">Board title</FieldLabel>
        <Input id="board-title" />
      </Field>
    );

    expect(screen.getByLabelText('Board title')).toBeInTheDocument();
  });

  it('does not announce errors assertively unless requested', () => {
    render(<FieldError>Optional validation message</FieldError>);

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    expect(screen.getByText('Optional validation message')).toBeInTheDocument();
  });
});
