import { Button } from "../Button/Button";
import "./stepper.css";
import { Dispatch, ReactNode } from "react";
import { Spinner } from "../Spinner/Spinner";
import { Step } from "./Step";
import { StepperAction, StepperState } from "./useStepperReducer";
import { classnames } from "../utils/classnames";

type Props = {
  /**
   * The steps titles
   */
  titles: string[];

  /**
   * The current component to show.
   */
  children: ReactNode;

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
  dispatch,
  className = "",
  backLabel = "Back",
  nextLabel = "Next",
  duration = 500,
  onNextStep,
}: Props) {
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
    <div
      className={classnames(
        ["stepper " + className],
        ["stepper--progress", state.progress]
      )}
    >
      <header>
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
      </header>

      <main>
        {state.progress ? <Spinner width={"3rem"} /> : <>{children}</>}
      </main>

      <footer>
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
      </footer>
    </div>
  );
}
