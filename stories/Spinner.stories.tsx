import type { Meta, StoryObj } from "@storybook/react";
import { Spinner } from "../src/components/Spinner/Spinner";

const meta = {
  title: "Overlays/Spinner",
  component: Spinner,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { width: "32" },
};
