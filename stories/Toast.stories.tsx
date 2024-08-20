import type { Meta, StoryObj } from "@storybook/react";
import { CircleCheck } from "lucide-react";
import { Toast } from "../components/Toast/Toast";
import { MouseEvent, useState } from "react";
import React from "react";

const meta = {
  title: "Overlays/Toast",
  component: Toast,
  parameters: {
    layout: "fullscreen",
    inlineStories: false,
    iframeHeight: "425px",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {},
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

const Template = () => {
  const [time, setTime] = useState(0);

  const onClick = (_: MouseEvent) => setTime(Date.now());

  return (
    <div style={{ padding: "2rem" }}>
      <button onClick={onClick}>Make Toast</button>
      <Toast
        Icon={() => (
          <CircleCheck
            size="1.25rem"
            fill="var(--codex-color-primary"
            className="primary upload-progress-check"
            stroke="var(--codex-background)"
          ></CircleCheck>
        )}
        message="Toast displayed with success"
        time={time}
      />
    </div>
  );
};

export const Default: Story = Template.bind({});
