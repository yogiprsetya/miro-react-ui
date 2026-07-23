import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { Switch } from '~/components/ui/switch';

/**
 * Use `Switch` for immediate on/off settings.
 * Prefer it over a checkbox when the change should happen instantly after interaction.
 */
const meta = {
  title: 'Components/Switch',
  component: Switch,
  tags: ['autodocs'],
  args: {
    checked: false,
    disabled: false,
    size: 'md',
    'aria-label': 'Enable notifications',
  },
  argTypes: {
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
    },
    onCheckedChange: { action: 'checked changed' },
  },
} satisfies Meta<typeof Switch>;

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
    const switchControl = canvas.getByRole('switch', {
      name: 'Enable notifications',
    });

    await expect(switchControl).toHaveAttribute('aria-checked', 'false');
    await userEvent.click(switchControl);
    await expect(switchControl).toHaveAttribute('aria-checked', 'true');
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
