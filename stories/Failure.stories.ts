import type { Meta, StoryObj } from "@storybook/react";
import { Failure } from "../components/Failure/Failure";

const meta = {
  title: "Content/Failure",
  component: Failure,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Failure>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Some error",
    code: 500,
    message: "Something went wrong",
  },
};

export const WithAction: Story = {
  args: {
    title: "Some error",
    code: 500,
    message: "Something went wrong",
    onClick: () => {},
  },
};
