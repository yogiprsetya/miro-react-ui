import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Progress } from '~/components/ui/progress';

describe('Progress', () => {
  it('renders a progressbar with default structure', () => {
    const { container } = render(<Progress />);

    const root = container.querySelector('[data-slot="progress"]');
    expect(root).toBeInTheDocument();
    expect(root).toHaveAttribute('role', 'progressbar');
    expect(root).toHaveAttribute('data-state', 'indeterminate');

    const indicator = container.querySelector(
      '[data-slot="progress-indicator"]'
    );
    expect(indicator).toBeInTheDocument();
  });

  it('translates the indicator based on value', () => {
    const { container } = render(<Progress value={75} />);

    const root = screen.getByRole('progressbar');
    expect(root).toHaveAttribute('aria-valuenow', '75');
    expect(root).toHaveAttribute('aria-valuemin', '0');
    expect(root).toHaveAttribute('aria-valuemax', '100');

    const indicator = container.querySelector(
      '[data-slot="progress-indicator"]'
    );
    expect(indicator).toHaveStyle({ transform: 'translateX(-25%)' });
  });

  it.each([
    [-20, 'translateX(-100%)'],
    [120, 'translateX(0%)'],
  ])('clamps value %i to the valid range', (value, transform) => {
    const { container } = render(<Progress value={value} />);

    const indicator = container.querySelector(
      '[data-slot="progress-indicator"]'
    );
    expect(indicator).toHaveStyle({ transform });
  });

  it('renders at 0% when value is not provided', () => {
    const { container } = render(
      <Progress aria-label="Upload progress" />
    );

    const root = screen.getByRole('progressbar', { name: 'Upload progress' });
    expect(root).toHaveAttribute('data-state', 'indeterminate');
    expect(root).not.toHaveAttribute('aria-valuenow');

    const indicator = container.querySelector(
      '[data-slot="progress-indicator"]'
    );
    expect(indicator).toHaveStyle({ transform: 'translateX(-100%)' });
  });

  it('applies custom className to the root', () => {
    render(<Progress className="h-4" />);

    const root = screen.getByRole('progressbar');
    expect(root.className).toContain('h-4');
    expect(root.className).toContain('rounded-full');
  });

  it('forwards additional HTML attributes', () => {
    render(<Progress value={50} id="upload-progress" data-testid="progress" />);

    const root = screen.getByRole('progressbar');
    expect(root).toHaveAttribute('id', 'upload-progress');
    expect(root).toHaveAttribute('data-testid', 'progress');
  });
});
