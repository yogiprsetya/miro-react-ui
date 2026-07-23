import type { Meta, StoryObj } from '@storybook/react-vite';
import { Progress } from '~/components/ui/progress';

/**
 * Use `Progress` to show completion status of a task or upload.
 * The `value` prop accepts a number between 0 and 100.
 */
const meta = {
  title: 'Components/Progress',
  component: Progress,
  tags: ['autodocs'],
  args: {
    value: 50,
  },
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
    },
  },
} satisfies Meta<typeof Progress>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Empty: Story = {
  args: {
    value: 0,
  },
};

export const Indeterminate: Story = {
  args: {
    value: undefined,
    'aria-label': 'Uploading board export',
  },
};

export const AccessibleLabel: Story = {
  args: {
    value: 60,
    'aria-label': 'Board export progress',
  },
};

export const OutOfRangeInput: Story = {
  args: {
    value: 120,
    'aria-label': 'Clamped progress example',
  },
};

export const NegativeInput: Story = {
  args: {
    value: -20,
    'aria-label': 'Clamped negative progress example',
  },
};

export const Full: Story = {
  args: {
    value: 100,
  },
};

export const TwentyFivePercent: Story = {
  args: {
    value: 25,
  },
};

export const SeventyFivePercent: Story = {
  args: {
    value: 75,
  },
};

export const CustomWidth: Story = {
  args: {
    value: 60,
    className: 'w-48',
  },
};

export const CustomHeight: Story = {
  args: {
    value: 40,
    className: 'h-4',
  },
};
