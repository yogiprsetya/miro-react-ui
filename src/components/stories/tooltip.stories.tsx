import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '~/components/ui/tooltip';

/**
 * Use `Tooltip` to show additional information on hover or focus.
 * Keep content concise — a sentence or two at most.
 * For persistent help, consider a `Popover` or inline description instead.
 */
const meta = {
  title: 'Components/Tooltip',
  tags: ['autodocs'],
  args: {
    side: 'top',
    sideOffset: 4,
  },
  argTypes: {
    side: {
      control: 'inline-radio',
      options: ['top', 'right', 'bottom', 'left'],
    },
    sideOffset: { control: 'number' },
  },
  decorators: [
    (Story, context) => (
      <div className="flex min-h-64 items-center justify-center">
        <TooltipProvider>
          <Story {...context.args} />
        </TooltipProvider>
      </div>
    ),
  ],
} satisfies Meta<typeof TooltipContent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Tooltip>
      <TooltipTrigger>Hover me</TooltipTrigger>
      <TooltipContent {...args}>This is a tooltip</TooltipContent>
    </Tooltip>
  ),
};

export const Right: Story = {
  render: (args) => (
    <Tooltip>
      <TooltipTrigger>Hover me</TooltipTrigger>
      <TooltipContent {...args}>This is a tooltip</TooltipContent>
    </Tooltip>
  ),
  args: {
    side: 'right',
  },
};

export const Bottom: Story = {
  name: 'Side: Bottom',
  render: (args) => (
    <Tooltip>
      <TooltipTrigger>Hover me</TooltipTrigger>
      <TooltipContent {...args}>This is a tooltip</TooltipContent>
    </Tooltip>
  ),
  args: {
    side: 'bottom',
  },
};

export const Left: Story = {
  name: 'Side: Left',
  render: (args) => (
    <Tooltip>
      <TooltipTrigger>Hover me</TooltipTrigger>
      <TooltipContent {...args}>This is a tooltip</TooltipContent>
    </Tooltip>
  ),
  args: {
    side: 'left',
  },
};

export const WithDescription: Story = {
  render: (args) => (
    <Tooltip>
      <TooltipTrigger>Hover me</TooltipTrigger>
      <TooltipContent {...args}>
        This tooltip has a longer description to demonstrate text wrapping.
      </TooltipContent>
    </Tooltip>
  ),
};

export const Focus: Story = {
  render: (args) => (
    <Tooltip>
      <TooltipTrigger>Focus for help</TooltipTrigger>
      <TooltipContent {...args}>
        Shown when the trigger receives focus.
      </TooltipContent>
    </Tooltip>
  ),
};

export const LongContent: Story = {
  render: (args) => (
    <Tooltip>
      <TooltipTrigger>Long guidance</TooltipTrigger>
      <TooltipContent {...args} className="max-w-64">
        Use this guidance when a control needs concise supporting context
        without adding persistent layout content.
      </TooltipContent>
    </Tooltip>
  ),
};
