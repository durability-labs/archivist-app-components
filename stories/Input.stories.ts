import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Input } from "../components/Input/Input";
import { InputIcon } from "./InputIcon";

const meta = {
  title: "Forms/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: { onChange: fn() },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: "input",
    label: "Input",
  },
};

export const Helper: Story = {
  args: {
    id: "helper",
    label: "Input",
    helper: "Helper text to give some indication.",
  },
};

export const Icon: Story = {
  args: {
    id: "icon",
    label: "Icon",
    Icon: InputIcon,
  },
};

export const Disabled: Story = {
  args: {
    id: "disabled",
    label: "Disabled",
    disabled: true,
  },
};

export const CustomStyle: Story = {
  args: {
    id: "custom",
    label: "Label",
    style: { "--codex-input-border": "1px solid red" },
  },
};
