import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Button } from "../src/components/Button/Button";
import PlusIcon from "../src/assets/icons/plus.svg?react";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Components/Button",
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    variant: {
      control: { type: "select" },
    },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {
    onClick: fn(),
    onMouseEnter: fn(),
    onMouseLeave: fn(),
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    label: "Button",
  },
};

export const Outline: Story = {
  args: {
    label: "Button",
    variant: "outline",
  },
};

export const Icon: Story = {
  args: {
    label: "Button",
    Icon: PlusIcon,
  },
};

export const PrimaryFetching: Story = {
  args: {
    label: "Button",
    fetching: true,
  },
};

export const OutlineFetching: Story = {
  args: {
    label: "Button",
    variant: "outline",
    fetching: true,
  },
};

export const PrimaryDisabled: Story = {
  args: {
    label: "Button",
    disabled: true,
  },
};

export const OutlineDisabled: Story = {
  args: {
    label: "Button",
    variant: "outline",
    disabled: true,
  },
};

export const CustomStyle: Story = {
  args: {
    label: "Button",
    variant: "primary",

  },
};
