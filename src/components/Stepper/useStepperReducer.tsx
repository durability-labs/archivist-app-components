import { Dispatch, Reducer, useReducer } from "react";

export type StepperState = {
  /**
   * Enable the next button.
   */
  isNextEnable?: boolean;

  /**
   * Enable the back button.
   */
  isBackEnable?: boolean;

  // The current step to display in stepper state.
  step: number;

  // If it's true, the stepper will display a spinner.
  // The progress is controlled by the parent component,
  // to give flexibility when changing step.
  progress: boolean;

  open: boolean;
};

export type StepperAction =
  | {
      type: "close" | "open";
    }
  | {
      type: "loading";
      step: number;
    }
  | {
      type: "next";
      step: number;
    }
  | {
      type: "toggle-next";
      isNextEnable: boolean;
    }
  | {
      type: "toggle-back";
      isBackEnable: boolean;
    };

export type StepperBodyProps = {
  dispatch: Dispatch<StepperAction>;
};

/**
 * Create a reducer for the stepper.
 * The storage key allows to save the step when the user
 * move from a step to another.
 */
const reducer = () => (state: StepperState, action: StepperAction) => {
  switch (action.type) {
    case "close": {
      return {
        ...state,
        open: false,
      };
    }

    case "open": {
      return {
        ...state,
        open: true,
      };
    }

    case "loading": {
      return {
        ...state,
        step: action.step,
        progress: true,
      };
    }

    case "next": {
      return {
        ...state,
        progress: false,
        step: action.step,
      };
    }

    case "toggle-next": {
      return {
        ...state,
        isNextEnable: action.isNextEnable,
      };
    }

    case "toggle-back": {
      return {
        ...state,
        isBackEnable: action.isBackEnable,
      };
    }
  }
};

export function useStepperReducer() {
  const [state, dispatch] = useReducer<Reducer<StepperState, StepperAction>>(
    reducer(),
    {
      step: 0,
      isNextEnable: false,
      progress: false,
      open: false,
    }
  );

  return { state, dispatch };
}
