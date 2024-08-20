import type { Meta, StoryObj } from "@storybook/react";
import { Alert } from "../components/Alert/Alert";

const meta = {
  title: "Overlays/Alert",
  component: Alert,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
    },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
  args: {
    message: "This is a success message.",
    variant: "success",
  },
};

export const Warning: Story = {
  args: {
    message: "This is a warning message.",
    variant: "warning",
  },
};

export const CustomStyle: Story = {
  args: {
    message: "This is a custom style message.",
    variant: "warning",
    style: { "--codex-color-warning": "red" },
  },
};
