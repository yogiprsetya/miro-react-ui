import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarBadge,
  AvatarGroup,
  AvatarGroupCount,
} from '~/components/ui/avatar';

/**
 * Use `Avatar` to represent a user or entity with an image or initials fallback.
 * Supports five sizes, a badge overlay, and an avatar group for stacked display.
 */
const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  args: {
    size: '64',
  },
  argTypes: {
    size: {
      control: 'inline-radio',
      options: ['24', '32', '48', '64', '96'],
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  ),
};

export const WithImage: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage
        src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
        alt="Jane Doe"
      />
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  ),
};

export const Size24: Story = {
  args: { size: '24' },
  render: (args) => (
    <Avatar {...args}>
      <AvatarFallback>AB</AvatarFallback>
    </Avatar>
  ),
};

export const Size32: Story = {
  args: { size: '32' },
  render: (args) => (
    <Avatar {...args}>
      <AvatarFallback>CD</AvatarFallback>
    </Avatar>
  ),
};

export const Size48: Story = {
  args: { size: '48' },
  render: (args) => (
    <Avatar {...args}>
      <AvatarFallback>EF</AvatarFallback>
    </Avatar>
  ),
};

export const Size96: Story = {
  args: { size: '96' },
  render: (args) => (
    <Avatar {...args}>
      <AvatarFallback>GH</AvatarFallback>
    </Avatar>
  ),
};

export const WithBadge: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage
        src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
        alt="Online user"
      />
      <AvatarFallback>JD</AvatarFallback>
      <AvatarBadge />
    </Avatar>
  ),
};

export const Group: Story = {
  render: () => (
    <AvatarGroup>
      <Avatar>
        <AvatarImage
          src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
          alt="User 1"
        />
        <AvatarFallback>U1</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage
          src="https://i.pravatar.cc/150?u=a042581f4e29026704e"
          alt="User 2"
        />
        <AvatarFallback>U2</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage
          src="https://i.pravatar.cc/150?u=a042581f4e29026704f"
          alt="User 3"
        />
        <AvatarFallback>U3</AvatarFallback>
      </Avatar>
      <AvatarGroupCount>+5</AvatarGroupCount>
    </AvatarGroup>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      <Avatar size="24">
        <AvatarFallback>A</AvatarFallback>
      </Avatar>
      <Avatar size="32">
        <AvatarFallback>B</AvatarFallback>
      </Avatar>
      <Avatar size="48">
        <AvatarFallback>C</AvatarFallback>
      </Avatar>
      <Avatar size="64">
        <AvatarFallback>D</AvatarFallback>
      </Avatar>
      <Avatar size="96">
        <AvatarFallback>E</AvatarFallback>
      </Avatar>
    </div>
  ),
};
