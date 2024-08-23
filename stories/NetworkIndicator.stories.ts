import type { Meta, StoryObj } from "@storybook/react";
import { NetworkIndicator } from "../src/components/NetworkIndicator/NetworkIndicator";

const meta = {
  title: "Components/NetworkIndicator",
  component: NetworkIndicator,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof NetworkIndicator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Online: Story = {
  args: {
    online: true,
    text: "Online",
  },
};

export const Offline: Story = {
  args: {
    online: false,
    text: "Offline",
  },
};
