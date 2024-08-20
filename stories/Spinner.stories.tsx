import type { Meta, StoryObj } from "@storybook/react";
import { Spinner } from "../components/Spinner/Spinner";
import React from "react";

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
