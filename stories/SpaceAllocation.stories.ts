import type { Meta, StoryObj } from "@storybook/react";
import { SpaceAllocation } from "../src/components/SpaceAllocation/SpaceAllocation";

const meta = {
  title: "Advanced/SpaceAllocation",
  component: SpaceAllocation,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof SpaceAllocation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: [
      {
        title: "Space allocated",
        size: 10000000,
      },
      {
        title: "New space allocation",
        size: 10000000 * 0.2,
      },
      {
        title: "Remaining space",
        size: 10000000 * 0.2,
      },
    ],
  },
};
