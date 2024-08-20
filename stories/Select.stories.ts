import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Select } from "../components/Select/Select";

const meta = {
  title: "Forms/Select",
  component: Select,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: { onChange: fn() },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: "select",
    label: "Select",
    options: [
      ["value 1", "Text 1"],
      ["value 2", "Text 2"],
    ],
  },
};

export const CustomStyle: Story = {
  args: {
    id: "select",
    label: "Select",
    options: [
      ["value 1", "Text 1"],
      ["value 2", "Text 2"],
    ],
    style: { "--codex-select-border": "1px solid red" },
  },
};
