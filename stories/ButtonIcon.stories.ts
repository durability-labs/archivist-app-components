import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Plus } from "lucide-react";
import { ButtonIcon } from "../src/components/ButtonIcon/ButtonIcon";

const meta = {
  title: "Components/ButtonIcon",
  component: ButtonIcon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
    },
  },
  args: { onClick: fn(), onMouseEnter: fn(), onMouseLeave: fn() },
} satisfies Meta<typeof ButtonIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Small: Story = {
  args: {
    Icon: Plus,
    variant: "small",
  },
};

export const Big: Story = {
  args: {
    Icon: Plus,
    variant: "big",
  },
};

export const Disabled: Story = {
  args: {
    Icon: Plus,
    disabled: true,
  },
};

export const CustomStyle: Story = {
  args: {
    Icon: Plus,
    variant: "big",
    style: {
      "--codex-button-icon-background": "red",
    },
  },
};
