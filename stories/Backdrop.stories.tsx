import type { Meta, StoryObj } from "@storybook/react";
import { Backdrop } from "../components/Backdrop/Backdrop";
import { useState } from "react";
import React from "react";

const meta = {
  title: "Overlays/Backdrop",
  component: Backdrop,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Backdrop>;

export default meta;
type Story = StoryObj<typeof meta>;

const Template = () => {
  const [open, setOpen] = useState(false);

  const onClick = () => setOpen(true);

  return (
    <div style={{ padding: "2rem" }}>
      <button onClick={onClick}>Show backdrop</button>
      <Backdrop onClose={() => setOpen(false)} open={open} />
    </div>
  );
};

export const Default: Story = Template.bind({});
