import type { Meta, StoryObj } from '@storybook/react-vite';
import { Label } from '~/components/ui/label';
import { Textarea } from '~/components/ui/textarea';

/**
 * Use `Textarea` for multi-line freeform text such as descriptions, comments, or notes.
 * Pair it with `Label` for accessible forms and prefer `Input` when the value is expected to be a single line.
 */
const meta = {
  title: 'Components/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  args: {
    placeholder: 'Enter a description',
    disabled: false,
    'aria-label': 'Textarea field',
    rows: 5,
  },
  argTypes: {
    onChange: { action: 'changed' },
  },
} satisfies Meta<typeof Textarea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithLabel: Story = {
  render: (args) => (
    <div className="flex w-80 flex-col gap-1">
      <Label htmlFor="story-textarea">Board description</Label>
      <Textarea {...args} id="story-textarea" aria-label={undefined} />
    </div>
  ),
  args: {
    placeholder: 'Describe the purpose of this board...',
  },
};

export const Invalid: Story = {
  args: {
    'aria-label': 'Board description',
    'aria-invalid': 'true',
    defaultValue: 'This description is too short',
  },
};

export const Disabled: Story = {
  args: {
    'aria-label': 'Board description',
    disabled: true,
    defaultValue: 'This description cannot be edited',
  },
};

export const Filled: Story = {
  args: {
    'aria-label': 'Board description',
    defaultValue:
      'This is a longer block of text showing how the textarea expands and wraps content over multiple lines.',
  },
};
