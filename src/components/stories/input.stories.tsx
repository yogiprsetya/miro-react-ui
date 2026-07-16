import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';

/**
 * Use `Input` for single-line form values such as names, slugs, and dates.
 * Pair it with `Label` for accessible forms and switch to a different control when the value is not freeform text.
 */
const meta = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  args: {
    type: 'text',
    placeholder: 'Enter a value',
    disabled: false,
    'aria-label': 'Input field',
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'date'],
    },
    onChange: { action: 'changed' },
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithLabel: Story = {
  render: (args) => (
    <div className="flex w-80 flex-col gap-1">
      <Label htmlFor="story-input">Board title</Label>
      <Input {...args} id="story-input" aria-label={undefined} />
    </div>
  ),
  args: {
    placeholder: 'Q3 planning board',
  },
};

export const Invalid: Story = {
  args: {
    'aria-label': 'Workspace slug',
    'aria-invalid': 'true',
    defaultValue: 'invalid slug',
  },
};

export const Disabled: Story = {
  args: {
    'aria-label': 'Workspace name',
    disabled: true,
    defaultValue: 'Team workspace',
  },
};

export const DateField: Story = {
  args: {
    'aria-label': 'Due date',
    type: 'date',
  },
};
