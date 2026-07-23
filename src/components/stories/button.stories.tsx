import type { Meta, StoryObj } from '@storybook/react-vite';
import { Plus } from 'lucide-react';
import { expect, fn, userEvent, within } from 'storybook/test';
import { Button } from '~/components/ui/button';

/**
 * Use `Button` for primary and secondary actions.
 * Prefer `solid` for the main call to action and `outline` for lower-emphasis actions.
 */
const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  args: {
    children: 'Create issue',
    variant: 'solid',
    size: 'md',
    disabled: false,
    asChild: false,
  },
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['solid', 'outline'],
    },
    size: {
      control: 'inline-radio',
      options: ['lg', 'md', 'sm'],
    },
    onClick: { action: 'clicked' },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Cancel',
  },
};

export const LargeWithIcon: Story = {
  args: {
    size: 'lg',
    children: (
      <>
        <Plus />
        New board
      </>
    ),
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Quick add',
  },
};

export const Interaction: Story = {
  args: {
    onClick: fn(),
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: 'Create issue' });

    await userEvent.click(button);

    await expect(args.onClick).toHaveBeenCalledOnce();
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Saving...',
  },
};

export const AsLink: Story = {
  render: (args) => (
    <Button {...args} asChild>
      <a href="/docs">Read documentation</a>
    </Button>
  ),
};

export const AsLinkDisabledLimitation: Story = {
  args: {
    disabled: true,
    children: 'Unavailable documentation',
  },
  render: (args) => (
    <div className="grid gap-2">
      <Button {...args} asChild>
        <a href="/docs">Unavailable documentation</a>
      </Button>
      <p className="text-sm text-neutral-600">
        `disabled` is not native link behavior. Remove `href` or add explicit
        `aria-disabled`, focus, and click handling in the consuming app.
      </p>
    </div>
  ),
};
