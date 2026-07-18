import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '~/components/ui/tooltip';

describe('Tooltip', () => {
  it('renders the trigger with correct data-slot and as a button', () => {
    render(
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>Hover me</TooltipTrigger>
          <TooltipContent>Tooltip text</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );

    const trigger = screen.getByRole('button', { name: 'Hover me' });
    expect(trigger).toBeInTheDocument();
    expect(trigger.tagName).toBe('BUTTON');
    expect(trigger).toHaveAttribute('data-slot', 'tooltip-trigger');
  });

  it('forwards ref on the trigger', () => {
    const ref = { current: null };

    render(
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger ref={ref}>Hover me</TooltipTrigger>
          <TooltipContent>Tooltip text</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );

    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
