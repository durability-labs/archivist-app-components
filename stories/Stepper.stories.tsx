import type { Meta, StoryObj } from "@storybook/react";
import { Stepper } from "../components/Stepper/Stepper";
import React, { CSSProperties, useState } from "react";

const meta = {
  title: "Advanced/Stepper",
  component: Stepper,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {},
  //   args: { onClick: fn() },
} satisfies Meta<typeof Stepper>;

export default meta;
type Story = StoryObj<typeof meta>;

const Template = () => {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(false);

  const titles = ["Hello world", "Hello world 2", "Hello world 3"];
  const title = titles[step];

  const onChangeStep = (newStep: number, event: "before" | "end") => {
    if (event === "before") {
      setProgress(true);
      return;
    }

    setProgress(false);
    setStep(newStep);
  };

  return (
    <Stepper
      Body={() => React.createElement("p", {}, title)}
      titles={titles}
      onChangeStep={onChangeStep}
      progress={progress}
      step={step}
      isNextDisable={progress || step === 2}
    />
  );
};

export const Default: Story = Template.bind({});
