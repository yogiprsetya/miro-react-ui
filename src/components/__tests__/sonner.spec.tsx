import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { toast } from 'sonner';
import { Toaster } from '~/components/ui/sonner';
import { Button } from '~/components/ui/button';

function TestApp({
  onToast,
  ...toasterProps
}: { onToast: () => void } & React.ComponentProps<typeof Toaster>) {
  return (
    <div>
      <Button onClick={onToast}>Show toast</Button>
      <Toaster {...toasterProps} />
    </div>
  );
}

describe('Toaster', () => {
  it('renders the toaster container after a toast is triggered', async () => {
    const user = userEvent.setup();
    const onToast = () => toast('Board created');

    render(<TestApp onToast={onToast} />);

    await user.click(screen.getByRole('button', { name: 'Show toast' }));

    const region = await screen.findByRole('region', {
      name: /notifications/i,
    });

    expect(region).toBeInTheDocument();
    expect(region).toHaveAttribute('aria-live', 'polite');
  });

  it('passes theme and style props to the underlying toaster', async () => {
    const user = userEvent.setup();
    const { container } = render(<TestApp onToast={() => toast('Styled')} />);

    await user.click(screen.getByRole('button', { name: 'Show toast' }));
    await screen.findByText('Styled');

    const toaster = container.querySelector('[data-sonner-toaster]');

    expect(toaster).toBeInTheDocument();
    expect(toaster).toHaveAttribute('data-sonner-theme', 'light');
  });

  it('applies custom variant color CSS variables', async () => {
    const user = userEvent.setup();
    const { container } = render(<TestApp onToast={() => toast('Styled')} />);

    await user.click(screen.getByRole('button', { name: 'Show toast' }));
    await screen.findByText('Styled');

    const toaster = container.querySelector('[data-sonner-toaster]');

    expect(toaster).toHaveStyle({
      '--success-title': 'var(--color-success-600)',
    });
    expect(toaster).toHaveStyle({ '--error-title': 'var(--color-error-600)' });
    expect(toaster).toHaveStyle({ '--info-text': 'var(--color-primary-600)' });
    expect(toaster).toHaveStyle({
      '--warning-text': 'var(--color-warning-600)',
    });
  });

  it('displays a toast when triggered', async () => {
    const user = userEvent.setup();
    const onToast = () => toast('Board created');

    render(<TestApp onToast={onToast} />);

    await user.click(screen.getByRole('button', { name: 'Show toast' }));

    expect(await screen.findByText('Board created')).toBeInTheDocument();
  });

  it('displays toast variants with correct icons', async () => {
    const user = userEvent.setup();
    const onToast = () => {
      toast.success('Saved successfully');
      toast.error('Something went wrong');
      toast.info('New mention');
      toast.warning('Offline mode');
    };

    render(<TestApp onToast={onToast} />);

    await user.click(screen.getByRole('button', { name: 'Show toast' }));

    expect(await screen.findByText('Saved successfully')).toBeInTheDocument();
    expect(await screen.findByText('Something went wrong')).toBeInTheDocument();
    expect(await screen.findByText('New mention')).toBeInTheDocument();
    expect(await screen.findByText('Offline mode')).toBeInTheDocument();
  });

  it('respects external props forwarded to the sonner component', async () => {
    const user = userEvent.setup();
    const { container } = render(
      <TestApp onToast={() => toast('Positioned')} position="bottom-left" />
    );

    await user.click(screen.getByRole('button', { name: 'Show toast' }));
    await screen.findByText('Positioned');

    const toaster = container.querySelector('[data-sonner-toaster]');

    expect(toaster).toHaveAttribute('data-x-position', 'left');
    expect(toaster).toHaveAttribute('data-y-position', 'bottom');
  });

  it('calls onDismiss when a toast is dismissed', async () => {
    const user = userEvent.setup();
    const onDismiss = vi.fn();

    const onToast = () => toast('Dismissible', { onDismiss });

    render(<TestApp onToast={onToast} closeButton />);

    await user.click(screen.getByRole('button', { name: 'Show toast' }));
    await screen.findByText('Dismissible');

    const closeButton = screen.getByRole('button', { name: 'Close toast' });
    await user.click(closeButton);

    expect(onDismiss).toHaveBeenCalledOnce();
  });

  it('supports keyboard dismissal through the close button', async () => {
    const user = userEvent.setup();
    const onDismiss = vi.fn();

    render(
      <TestApp
        onToast={() => toast('Keyboard dismissible', { onDismiss })}
        closeButton
      />
    );

    await user.click(screen.getByRole('button', { name: 'Show toast' }));
    const closeButton = await screen.findByRole('button', {
      name: 'Close toast',
    });

    closeButton.focus();
    await user.keyboard('{Enter}');

    expect(onDismiss).toHaveBeenCalledOnce();
  });
});
