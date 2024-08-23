import type { Meta, StoryObj } from "@storybook/react";
import { AppBar } from "../src/components/AppBar/AppBar";
import { fn } from "@storybook/test";
import { NetworkIndicator } from "../src/components/NetworkIndicator/NetworkIndicator";

const meta = {
  title: "Components/AppBar",
  component: AppBar,
  parameters: {
    layout: "fullwidth",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof AppBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onExpand: fn(),
    Right: <NetworkIndicator online={true} text="Online" />,
  },
};
