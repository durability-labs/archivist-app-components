import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { InputGroup } from "../components/InputGroup/InputGroup";

const meta = {
  title: "Components/InputGroup",
  component: InputGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: { onChange: fn() },
} satisfies Meta<typeof InputGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Simple: Story = {
  args: {
    id: "input",
    label: "Input",
    group: "Seconds",
  },
};

export const Select: Story = {
  args: {
    id: "input",
    label: "Input",
    group: [
      ["seconds", "Seconds"],
      ["minutes", "Minutes"],
    ],
  },
};
