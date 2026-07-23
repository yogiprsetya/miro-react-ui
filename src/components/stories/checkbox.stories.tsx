import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { Checkbox } from '~/components/ui/checkbox';

/**
 * Use `Checkbox` when users can select one or more independent options.
 * Prefer it over a switch when the choice should be reviewed before form submission.
 */
const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  args: {
    checked: false,
    disabled: false,
    size: 'md',
    'aria-label': 'Accept terms',
  },
  argTypes: {
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
    },
    onCheckedChange: { action: 'checked changed' },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    checked: false,
  },
};

export const Checked: Story = {
  args: {
    checked: true,
  },
};

export const Interaction: Story = {
  args: {
    checked: undefined,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole('checkbox', { name: 'Accept terms' });

    await expect(checkbox).toHaveAttribute('aria-checked', 'false');
    await userEvent.click(checkbox);
    await expect(checkbox).toHaveAttribute('aria-checked', 'true');
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    'aria-label': 'Receive updates',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    'aria-label': 'Share workspace access',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const DisabledInteraction: Story = {
  args: {
    disabled: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole('checkbox', { name: 'Accept terms' });

    await expect(checkbox).toBeDisabled();
    await userEvent.click(checkbox);
    await expect(checkbox).toHaveAttribute('aria-checked', 'false');
  },
};
