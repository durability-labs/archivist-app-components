import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { InputGroup } from "../src/components/InputGroup/InputGroup";

const meta = {
  title: "Forms/InputGroup",
  component: InputGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {
    onGroupChange: fn(),
    onChange: fn(),
    onFocus: fn(),
    onBlur: fn(),
    onMouseEnter: fn(),
    onMouseLeave: fn(),
  },
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
