import type { Meta, StoryObj } from "@storybook/react";
import { SimpleText } from "../components/SimpleText/SimpleText";

const meta = {
  title: "Components/SimpleText",
  component: SimpleText,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof SimpleText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
  args: {
    variant: "normal",
    children: "Normal message.",
  },
};

export const Light: Story = {
  args: {
    variant: "light",
    children: "Light message.",
  },
};

export const Success: Story = {
  args: {
    variant: "primary",
    children: "Primary message.",
  },
};

export const Error: Story = {
  args: {
    variant: "error",
    children: "Error message.",
  },
};

export const Warning: Story = {
  args: {
    variant: "warning",
    children: "Warning message.",
  },
};

export const CustomStyle: Story = {
  args: {
    variant: "normal",
    children: "Normal message.",
    style: { "--codex-color": "red" },
  },
};
