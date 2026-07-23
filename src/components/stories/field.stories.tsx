import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldLayout,
} from '~/components/system/field';
import { Input } from '~/components/ui/input';

/**
 * Use FieldLayout primitives to keep labels, help text, and validation messages
 * associated with a form control. Compose the control's `aria-describedby`
 * from the description and error IDs when both are present.
 */
const meta = {
  title: 'Components/Field',
  component: FieldLayout,
  tags: ['autodocs'],
} satisfies Meta<typeof FieldLayout>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <FieldLayout {...args}>
      <FieldLabel htmlFor="workspace-name">Workspace name</FieldLabel>
      <Input id="workspace-name" placeholder="Design team" />
      <FieldDescription id="workspace-name-description">
        Choose a name your team will recognize.
      </FieldDescription>
    </FieldLayout>
  ),
};

export const Invalid: Story = {
  render: (args) => (
    <FieldLayout {...args}>
      <FieldLabel htmlFor="email">Email</FieldLabel>
      <Input
        id="email"
        type="email"
        aria-invalid="true"
        aria-describedby="email-description email-error"
        defaultValue="not-an-email"
      />
      <FieldDescription id="email-description">
        Use your work email address.
      </FieldDescription>
      <FieldError id="email-error">Enter a valid email address.</FieldError>
    </FieldLayout>
  ),
};
