import type { Meta, StoryObj } from "@storybook/react";
import { Alert } from "../src/components/Alert/Alert";
import { InfoIcon } from "lucide-react";

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
    title: "Success",
    children: "This is a success message.",
    variant: "success",
  },
};

export const Warning: Story = {
  args: {
    children: "This is a warning message.",
    variant: "warning",
    title: "Warning",
  },
};

export const Icon: Story = {
  args: {
    Icon: <InfoIcon />,
    children: "This is a warning message.",
    variant: "success",
    title: "Success",
  },
};
