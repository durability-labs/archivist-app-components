import { Button } from "../Button/Button";
import "./stepper.css";
import { CSSProperties } from "react";
import { Spinner } from "../Spinner/Spinner";
import { Step } from "./Step";

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
  Body: () => JSX.Element;

  // The current step to display in stepper state.
  step: number;

  // If it's true, the stepper will display a spinner.
  // The progress is controlled by the parent component,
  // to give flexibility when changing step.
  progress: boolean;

  /**
   * The duration between two steps in milliseconds.
   * The default is 500.
   */
  duration?: number;

  /**
   * Callback called whenever the step is changing.
   * It's working in two phase:
   * "before" - allow to do before actions like updating progress state
   * "end" - executed after duration time
   */
  onChangeStep: (s: number, state: "before" | "end") => void | Promise<void>;

  /**
   * Disable the next button.
   * Default: progress == true
   */
  isNextDisable?: boolean;

  style?: CustomStyleCSS;
};

type Step = {
  index: number;
  title: string;
};

export function Stepper({
  titles,
  Body,
  step,
  progress,
  onChangeStep,
  duration = 500,
  isNextDisable = progress,
  style,
}: Props) {
  const onMoveStep = async (newStep: number) => {
    await onChangeStep(newStep, "before");
    setTimeout(() => onChangeStep(newStep, "end"), duration);
  };

  const label = step === titles.length - 1 ? "Finish" : "Next";

  return (
    <div className="stepper" style={style}>
      <div className="stepper-steps">
        {titles.map((title, index) => (
          <Step
            title={title}
            step={index}
            isActive={index === step}
            isLast={index === titles.length - 1}
            isDone={index < step}
            key={title}
            onClick={step > index ? () => onMoveStep(index) : undefined}
          />
        ))}
      </div>

      <div className="stepper-body">
        {progress ? (
          <div className="stepper-progress">
            <Spinner width={"3rem"} />
          </div>
        ) : (
          <Body />
        )}
      </div>

      <div className="stepper-buttons">
        <Button
          label={step ? "Back" : "Close"}
          variant="outline"
          onClick={() => onMoveStep(step - 1)}
          disabled={progress}
        />
        <Button
          label={label}
          onClick={() => onMoveStep(step + 1)}
          disabled={isNextDisable}
        />
      </div>
    </div>
  );
}

// <div className="stepper-success">
// <video src="/animations/success.webm" autoPlay />
// <p>
//   <b>Success ! </b>
// </p>
// <p className="text-center">
//   Your request has been submitted. Check your purchases list to get
//   more information about the status.
// </p>
// </div>
