import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { RadioGroup, RadioGroupItem } from '~/components/ui/radio-group';

/**
 * Use `RadioGroup` when users must choose exactly one option from a small set.
 * Prefer it over a select when all choices should stay visible for quick comparison.
 */
const meta = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  args: {
    defaultValue: 'board',
    'aria-label': 'View mode',
  },
  argTypes: {
    onValueChange: { action: 'value changed' },
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

const radioOptions = [
  { value: 'board', label: 'Board view' },
  { value: 'list', label: 'List view' },
  { value: 'timeline', label: 'Timeline view' },
] as const;

function RadioGroupPreview({
  size = 'md',
  disabled = false,
  ...args
}: {
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
} & React.ComponentProps<typeof RadioGroup>) {
  return (
    <RadioGroup {...args} className="gap-3">
      {radioOptions.map((option) => (
        <label key={option.value} className="flex items-center gap-3 text-sm">
          <RadioGroupItem
            value={option.value}
            size={size}
            disabled={disabled}
            aria-label={option.label}
          />
          <span>{option.label}</span>
        </label>
      ))}
    </RadioGroup>
  );
}

export const Default: Story = {
  render: (args) => <RadioGroupPreview {...args} />,
};

export const Small: Story = {
  render: (args) => <RadioGroupPreview {...args} size="sm" />,
};

export const Large: Story = {
  render: (args) => <RadioGroupPreview {...args} size="lg" />,
};

export const Disabled: Story = {
  render: (args) => <RadioGroupPreview {...args} disabled />,
};

export const KeyboardNavigation: Story = {
  render: () => (
    <RadioGroup defaultValue="comfortable" aria-label="Density">
      <RadioGroupItem value="comfortable" aria-label="Comfortable" />
      <RadioGroupItem value="compact" aria-label="Compact" />
    </RadioGroup>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const comfortable = canvas.getByRole('radio', { name: 'Comfortable' });
    const compact = canvas.getByRole('radio', { name: 'Compact' });

    comfortable.focus();
    await userEvent.keyboard('{ArrowDown}');

    await expect(compact).toHaveAttribute('data-state', 'checked');
  },
};
