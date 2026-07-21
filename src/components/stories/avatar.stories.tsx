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
    size: 'xl',
  },
  argTypes: {
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg', 'xl', '2xl'],
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;

const fixtureAvatar =
  'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 96 96%22%3E%3Crect width=%2296%22 height=%2296%22 fill=%22%230169cd%22/%3E%3Ccircle cx=%2248%22 cy=%2236%22 r=%2218%22 fill=%22%23eff8ff%22/%3E%3Cpath d=%22M18 86c4-20 16-30 30-30s26 10 30 30%22 fill=%22%23eff8ff%22/%3E%3C/svg%3E';

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
      <AvatarImage src={fixtureAvatar} alt="Jane Doe" />
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  ),
};

export const Size24: Story = {
  args: { size: 'sm' },
  render: (args) => (
    <Avatar {...args}>
      <AvatarFallback>AB</AvatarFallback>
    </Avatar>
  ),
};

export const Size32: Story = {
  args: { size: 'md' },
  render: (args) => (
    <Avatar {...args}>
      <AvatarFallback>CD</AvatarFallback>
    </Avatar>
  ),
};

export const Size48: Story = {
  args: { size: 'lg' },
  render: (args) => (
    <Avatar {...args}>
      <AvatarFallback>EF</AvatarFallback>
    </Avatar>
  ),
};

export const Size96: Story = {
  args: { size: '2xl' },
  render: (args) => (
    <Avatar {...args}>
      <AvatarFallback>GH</AvatarFallback>
    </Avatar>
  ),
};

export const WithBadge: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage src={fixtureAvatar} alt="Online user" />
      <AvatarFallback>JD</AvatarFallback>
      <AvatarBadge />
    </Avatar>
  ),
};

export const Group: Story = {
  render: () => (
    <AvatarGroup>
      <Avatar>
        <AvatarImage src={fixtureAvatar} alt="User 1" />
        <AvatarFallback>U1</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src={fixtureAvatar} alt="User 2" />
        <AvatarFallback>U2</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src={fixtureAvatar} alt="User 3" />
        <AvatarFallback>U3</AvatarFallback>
      </Avatar>
      <AvatarGroupCount>+5</AvatarGroupCount>
    </AvatarGroup>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      <Avatar size="sm">
        <AvatarFallback>A</AvatarFallback>
      </Avatar>
      <Avatar size="md">
        <AvatarFallback>B</AvatarFallback>
      </Avatar>
      <Avatar size="lg">
        <AvatarFallback>C</AvatarFallback>
      </Avatar>
      <Avatar size="xl">
        <AvatarFallback>D</AvatarFallback>
      </Avatar>
      <Avatar size="2xl">
        <AvatarFallback>E</AvatarFallback>
      </Avatar>
    </div>
  ),
};
