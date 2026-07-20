import { render, screen, waitFor } from '@testing-library/react';
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

  it('opens on focus and links the description to the trigger', async () => {
    const user = userEvent.setup();

    render(
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>Keyboard help</TooltipTrigger>
          <TooltipContent>Helpful keyboard guidance</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );

    const trigger = screen.getByRole('button', { name: 'Keyboard help' });
    await user.tab();

    const content = await screen.findByRole('tooltip', {
      name: 'Helpful keyboard guidance',
    });
    expect(trigger).toHaveAttribute('aria-describedby', content.id);
  });

  it('closes after Escape', async () => {
    const user = userEvent.setup();

    render(
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>Dismiss help</TooltipTrigger>
          <TooltipContent>Dismissible guidance</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );

    await user.tab();
    expect(await screen.findByRole('tooltip')).toBeInTheDocument();

    await user.keyboard('{Escape}');
    await waitFor(() => {
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    });
  });
});
