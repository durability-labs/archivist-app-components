import type { Meta } from "@storybook/react";
import { useState } from "react";
import { Sheets } from "../src/components/Sheets/Sheets";
import { fn } from "@storybook/test";

const meta = {
  title: "Overlays/Sheets",
  component: Sheets,
  parameters: {
    layout: "centered",
    inlineStories: false,
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {
    onClose: fn(),
  },
} satisfies Meta<typeof Sheets>;

export default meta;

const DefaultTemplate = (props: { onClose: () => void }) => {
  const [open, setOpen] = useState(false);

  const onClick = () => setOpen(true);

  const onClose = () => {
    props.onClose();
    setOpen(false);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <button onClick={onClick}>Make Sheets</button>

      <Sheets open={open} onClose={onClose}>
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span>Hello world</span>
        </div>
      </Sheets>
    </div>
  );
};

export const Default = DefaultTemplate.bind({});
