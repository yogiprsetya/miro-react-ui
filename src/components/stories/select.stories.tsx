import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { useId } from 'react';
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
  const selectId = useId();

  return (
    <Select {...selectProps}>
      {label ? (
        <Label htmlFor={selectId} className="mb-1 block">
          {label}
        </Label>
      ) : null}
      <SelectTrigger id={selectId} className="w-72">
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

export const Invalid: Story = {
  render: (args) => (
    <div className="flex flex-col gap-1">
      <SelectDemo
        {...args}
        label="Team role"
        aria-invalid="true"
        aria-describedby="invalid-select-error"
        value={undefined}
        defaultValue={undefined}
      />
      <p id="invalid-select-error" className="text-error-600 text-sm">
        Select a team role.
      </p>
    </div>
  ),
};

export const KeyboardInteraction: Story = {
  render: (args) => <SelectDemo {...args} label="Keyboard-selectable role" />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('combobox', {
      name: 'Keyboard-selectable role',
    });

    await userEvent.click(trigger);
    await userEvent.keyboard('{ArrowDown}{Enter}');

    await expect(trigger).toHaveTextContent('Editor');
  },
};
