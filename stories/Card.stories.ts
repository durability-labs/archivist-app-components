import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "../src/components/Card/Card";
import React from "react";

const meta = {
  title: "Components/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Hello",
    children: React.createElement("div", {}, "Hello World !"),
  },
};

export const CustomStyle: Story = {
  args: {
    title: "Hello",
    children: React.createElement("div", {}, "Hello World !"),
    style: { "--codex-border-radius": "0px" },
  },
};
