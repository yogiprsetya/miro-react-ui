import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from '~/components/ui/badge';

/**
 * Use `Badge` to display status labels, categories, or counts inline.
 * Available in semantic variants (primary, warning, success, error, neutral) and two sizes.
 */
const meta = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  args: {
    children: 'Status',
    variant: 'neutral',
    size: 'md',
  },
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['neutral', 'primary', 'warning', 'success', 'error'],
    },
    size: {
      control: 'inline-radio',
      options: ['sm', 'md'],
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Active',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    children: 'Pending review',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    children: 'Completed',
  },
};

export const Error: Story = {
  args: {
    variant: 'error',
    children: 'Failed',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    children: 'v1.2.3',
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
    children: 'Current version',
  },
};
