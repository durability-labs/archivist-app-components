import type { Meta } from "@storybook/react";
import { Stepper } from "../src/components/Stepper/Stepper";
import React, { useState } from "react";
import { fn } from "@storybook/test";

const meta = {
  title: "Advanced/Stepper",
  component: Stepper,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: { onChangeStep: fn() },
} satisfies Meta<typeof Stepper>;

export default meta;

type Props = {
  onChangeStep: (s: number, state: "before" | "end") => void | Promise<void>;
};

const Template = (p: Props) => {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(false);

  const titles = ["Hello world", "Hello world 2", "Hello world 3"];
  const title = titles[step];

  const onChangeStep = (newStep: number, event: "before" | "end") => {
    p.onChangeStep(newStep, event);

    if (event === "before") {
      setProgress(true);
      return;
    }

    setProgress(false);
    setStep(newStep);
  };

  return (
    <Stepper
      Body={() => React.createElement("div", {}, title)}
      titles={titles}
      onChangeStep={onChangeStep}
      progress={progress}
      step={step}
      isNextDisable={progress || step === 2}
    />
  );
};

export const Default = Template.bind({});
