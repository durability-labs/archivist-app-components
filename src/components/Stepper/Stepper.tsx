import { Button } from "../Button/Button";
import "./stepper.css";
import { CSSProperties, Dispatch, ReactNode } from "react";
import { Spinner } from "../Spinner/Spinner";
import { Step } from "./Step";
import { StepperAction, StepperState } from "./useStepperReducer";

interface CustomStyleCSS extends CSSProperties {
  "--codex-background"?: string;
  "--codex-border-radius"?: string;
  "--codex-stepper-background": string;
  "--codex-color-primary": string;
  "--codex-border-color": string;
}

type Props = {
  /**
   * The steps titles
   */
  titles: string[];

  /**
   * The current component to show.
   */
  children: ReactNode;

  style?: CustomStyleCSS;

  /**
   * The duration between steps
   */
  duration?: number;

  /**
   * Dispatch function created by the useStepperReducer
   */
  dispatch: Dispatch<StepperAction>;

  /**
   * State provided by useStepperReducer
   */
  state: StepperState;

  /**
   * Event called when a new step is triggered, after the loading function.
   */
  onNextStep: (step: number) => void | Promise<void>;

  className?: string;

  /**
   * Default: Back
   */
  backLabel?: string;

  /**
   * Default: Next
   */
  nextLabel?: string;
};

type Step = {
  index: number;
  title: string;
  className: string;
};

export function Stepper({
  titles,
  children,
  state,
  style,
  dispatch,
  className,
  backLabel = "Back",
  nextLabel = "Next",
  duration = 500,
  onNextStep,
}: Props) {
  const label = state.step === titles.length - 1 ? "Finish" : "Next";

  const onChangeStep = async (nextStep: number) => {
    if (nextStep < 0) {
      return dispatch({
        type: "close",
      });
    }

    dispatch({
      type: "loading",
      step: nextStep,
    });

    setTimeout(() => {
      onNextStep(nextStep);
    }, duration);
  };

  return (
    <div className={"stepper " + className} style={style}>
      <div className="stepper-steps">
        {titles.map((title, index) => (
          <Step
            title={title}
            step={index}
            isActive={index === state.step}
            isLast={index === titles.length - 1}
            isDone={index < state.step}
            key={title}
            onClick={state.step > index ? () => onChangeStep(index) : undefined}
          />
        ))}
      </div>

      <div className="stepper-body">
        {state.progress ? (
          <div className="stepper-progress">
            <Spinner width={"3rem"} />
          </div>
        ) : (
          <>{children}</>
        )}
      </div>

      <div className="stepper-buttons">
        <Button
          label={backLabel}
          variant="outline"
          onClick={() => onChangeStep(state.step - 1)}
          disabled={!state.isBackEnable}
        />
        <Button
          label={nextLabel}
          onClick={() => onChangeStep(state.step + 1)}
          disabled={!state.isNextEnable}
        />
      </div>
    </div>
  );
}
