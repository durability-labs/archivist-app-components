import type { Meta } from "@storybook/react";
import { Stepper } from "../src/components/Stepper/Stepper";
import { fn } from "@storybook/test";
import { useStepperReducer } from "../src/components/Stepper/useStepperReducer";
import { useEffect } from "react";
import "./Stepper.stories.css";

const meta = {
  title: "Advanced/Stepper",
  component: Stepper,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: { onNextStep: fn() },
} satisfies Meta<typeof Stepper>;

export default meta;

type Props = {
  onNextStep: (s: number) => void | Promise<void>;
};

const Template = (p: Props) => {
  const { state, dispatch } = useStepperReducer(3);

  useEffect(() => {
    dispatch({
      type: "toggle-next",
      isNextEnable: true,
    });
  }, [dispatch]);

  const titles = ["Hello world", "Hello world 2", "Hello world 3"];
  const title = titles[state.step];

  const onNextStep = async (step: number) => {
    p.onNextStep(step);

    dispatch({
      step,
      type: "next",
    });
  };

  return (
    <div style={{ padding: "6rem" }}>
      <Stepper
        titles={titles}
        state={state}
        dispatch={dispatch}
        onNextStep={onNextStep}
        className="stepper-padding"
      >
        <div>{title}</div>
      </Stepper>
    </div>
  );
};

export const Default = Template.bind({});
