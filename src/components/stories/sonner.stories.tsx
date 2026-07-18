import type { Meta, StoryObj } from '@storybook/react-vite';
import { toast, type ToasterProps } from 'sonner';
import { Button } from '~/components/ui/button';
import { Toaster } from '~/components/ui/sonner';

/**
 * Use `Toaster` to surface transient notifications, feedback, and confirmations.
 * Trigger toasts imperatively with `toast()` from `sonner` anywhere in the subtree.
 * Keep messages concise and actionable; use the `error` variant sparingly.
 */
const meta = {
  title: 'Components/Toaster',
  component: Toaster,
  tags: ['autodocs'],
  args: {
    position: 'bottom-right',
    richColors: true,
    closeButton: true,
    duration: 4000,
    visibleToasts: 3,
  },
  argTypes: {
    position: {
      control: 'select',
      options: [
        'top-left',
        'top-center',
        'top-right',
        'bottom-left',
        'bottom-center',
        'bottom-right',
      ],
    },
    richColors: { control: 'boolean' },
    closeButton: { control: 'boolean' },
    duration: { control: 'number' },
    visibleToasts: { control: 'number' },
    toastOptions: { control: 'object' },
  },
} satisfies Meta<typeof Toaster>;

export default meta;

type Story = StoryObj<typeof meta>;

function ToastTrigger(
  props: ToasterProps & {
    variant: 'default' | 'success' | 'error' | 'info' | 'warning' | 'loading';
  }
) {
  const { variant, ...toasterProps } = props;

  const handleClick = () => {
    const message =
      variant === 'default'
        ? 'This is a default toast'
        : `This is a ${variant} toast`;

    if (variant === 'loading') {
      toast.loading(message);
      return;
    }

    toast[variant === 'default' ? 'message' : variant](message, {
      duration: 500000,
      description:
        'Notification with some placeholder text. It should be replaced before publishing the app.',
    });
  };

  return (
    <div className="flex flex-col items-start gap-4">
      <Button onClick={handleClick}>Show toast</Button>
      <Toaster {...toasterProps} />
    </div>
  );
}

export const Success: Story = {
  render: (args) => <ToastTrigger {...args} variant="success" />,
};

export const Error: Story = {
  render: (args) => <ToastTrigger {...args} variant="error" />,
};

export const Info: Story = {
  render: (args) => <ToastTrigger {...args} variant="info" />,
};

export const Warning: Story = {
  render: (args) => <ToastTrigger {...args} variant="warning" />,
};

export const TopCenter: Story = {
  render: (args) => <ToastTrigger {...args} variant="default" />,
};

export const CloseButtonHidden: Story = {
  render: (args) => <ToastTrigger {...args} variant="default" />,
};
