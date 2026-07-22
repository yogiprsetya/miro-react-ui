import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Label } from '~/components/ui/label';

describe('Label', () => {
  it('associates with a form control', () => {
    render(
      <>
        <Label htmlFor="workspace-name">Workspace name</Label>
        <input id="workspace-name" />
      </>
    );

    expect(screen.getByLabelText('Workspace name')).toHaveAttribute(
      'id',
      'workspace-name'
    );
  });

  it('forwards custom attributes', () => {
    render(
      <Label className="text-lg" data-testid="workspace-label">
        Workspace
      </Label>
    );

    const label = screen.getByTestId('workspace-label');
    expect(label).toHaveTextContent('Workspace');
  });
});
