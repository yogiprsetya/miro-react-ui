import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import { Label } from '~/components/ui/label';

/**
 * Use `Select` when a user needs to pick one value from a predefined list of options.
 * It is more space-efficient than a radio group and works well when the list is long or when vertical space is limited.
 * For short lists with fewer than five options, consider a `RadioGroup` instead.
 */
const meta = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'select',
      options: ['', 'viewer', 'editor', 'admin'],
    },
    defaultValue: {
      control: 'select',
      options: ['', 'viewer', 'editor', 'admin'],
    },
    disabled: { control: 'boolean' },
    onValueChange: { action: 'value changed' },
  },
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

function SelectDemo(
  props: React.ComponentProps<typeof Select> & {
    placeholder?: string;
    label?: string;
  }
) {
  const { placeholder = 'Select a role', label, ...selectProps } = props;

  return (
    <Select {...selectProps}>
      {label ? (
        <Label htmlFor="story-select" className="mb-1 block">
          {label}
        </Label>
      ) : null}
      <SelectTrigger id="story-select" className="w-72">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Team roles</SelectLabel>
          <SelectItem value="viewer">Viewer</SelectItem>
          <SelectItem value="editor">Editor</SelectItem>
          <SelectSeparator />
          <SelectItem value="admin" disabled>
            Admin
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export const Default: Story = {
  render: (args) => (
    <SelectDemo
      {...args}
      placeholder="Select a role"
      label={undefined}
      value={undefined}
      defaultValue={undefined}
    />
  ),
};

export const WithLabel: Story = {
  render: (args) => (
    <SelectDemo
      {...args}
      label="Team role"
      placeholder="Select a role"
      value={undefined}
      defaultValue={undefined}
    />
  ),
};

export const Preselected: Story = {
  render: (args) => (
    <SelectDemo
      {...args}
      defaultValue="editor"
      placeholder="Select a role"
      label={undefined}
      value={undefined}
    />
  ),
};

export const Disabled: Story = {
  render: (args) => (
    <SelectDemo
      {...args}
      disabled
      placeholder="Select a role"
      label={undefined}
      value={undefined}
      defaultValue={undefined}
    />
  ),
};
