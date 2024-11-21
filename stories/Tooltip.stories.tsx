import type { Meta, StoryObj } from "@storybook/react";
import { Tooltip } from "../src/components/Tooltip/Tooltip";
import SuccessCircleIcon from "../src/assets/icons/success-circle.svg?react";

const meta = {
  title: "Overlays/Tooltip",
  component: Tooltip,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    message: "Hello world",
    children: <SuccessCircleIcon className="cell-stateIcon" />,
  },
};
