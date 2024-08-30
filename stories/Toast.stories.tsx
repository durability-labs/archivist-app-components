import type { Meta } from "@storybook/react";
import { Toast } from "../src/components/Toast/Toast";
import { useState } from "react";

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

const Template = () => {
  const [time, setTime] = useState(0);

  const onClick = () => setTime(Date.now());

  return (
    <div style={{ padding: "2rem" }}>
      <button onClick={onClick}>Make Toast</button>
      <Toast
        variant="success"
        message="Toast displayed with success"
        time={time}
      />
    </div>
  );
};

export const Success = Template.bind({});

const ErrorTemplate = () => {
  const [time, setTime] = useState(0);

  const onClick = () => setTime(Date.now());

  return (
    <div style={{ padding: "2rem" }}>
      <button onClick={onClick}>Make Toast</button>
      <Toast variant="error" message="Toast displayed with error" time={time} />
    </div>
  );
};

export const Error = ErrorTemplate.bind({});

const DefaultTemplate = () => {
  const [time, setTime] = useState(0);

  const onClick = () => setTime(Date.now());

  return (
    <div style={{ padding: "2rem" }}>
      <button onClick={onClick}>Make Toast</button>
      <Toast
        variant="default"
        message="Toast displayed with default"
        time={time}
      />
    </div>
  );
};

export const Default = DefaultTemplate.bind({});
