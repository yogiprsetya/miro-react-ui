import type { Meta, StoryObj } from '@storybook/react-vite';
import { Plus } from 'lucide-react';
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
    size: '40',
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
      options: ['48', '40', '38'],
    },
    onClick: { action: 'clicked' },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Cancel',
  },
};

export const LargeWithIcon: Story = {
  args: {
    size: '48',
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
    size: '38',
    children: 'Quick add',
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
