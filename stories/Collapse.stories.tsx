import type { Meta, StoryObj } from "@storybook/react";
import { Collapse } from "../src/components/Collapse/Collapse";
import "./Collapse.stories.css";

const meta = {
  title: "Components/Collapse",
  component: Collapse,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Collapse>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    summary: "Read more",
    details: "More details for collapse component",
    className: "collapse-demo",
  },
};
