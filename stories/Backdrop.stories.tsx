import type { Meta } from "@storybook/react";
import { Backdrop } from "../src/components/Backdrop/Backdrop";
import { useState } from "react";

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

export const Default = Template.bind({});
