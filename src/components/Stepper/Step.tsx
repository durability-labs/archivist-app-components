import { Check } from "lucide-react";
import { useEffect, useRef } from "react";
import { attributes } from "../utils/attributes";
import { classnames } from "../utils/classnames";
import "./Step.css";

type StepProps = {
  /**
   * Step title
   */
  title: string;

  /**
   * Step index
   */
  step: number;

  /**
   * If true, an active css class will be added
   */
  isActive: boolean;

  /**
   * If true, a css class will be added to draw the line between two steps
   */
  isLast: boolean;

  /**
   * If true, a done css class will be added to color the step
   */
  isDone: boolean;

  /**
   * Event triggered when a step number is clicked on
   */
  onClick?: (step: number) => void;
};

export function Step({
  step,
  isActive,
  isLast,
  isDone,
  title,
  onClick,
}: StepProps) {
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
  }, []);

  return (
    <div
      className={classnames(
        ["step", true],
        ["step--active", isActive],
        ["step--done", isDone],
        ["step--,mounted", mounted.current]
      )}
      onClick={() => onClick?.(step)}
      {...attributes({ disabled: !onClick })}
    >
      <div>
        <span>{isDone ? <Check size={"1.25rem"} /> : step + 1}</span>
      </div>

      {!isLast && (
        <div>
          <hr />
          <span>{title}</span>
        </div>
      )}
    </div>
  );
}
