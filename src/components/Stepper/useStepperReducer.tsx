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
    };

export type StepperBodyProps = {
  dispatch: Dispatch<StepperAction>;
};

/**
 * Create a reducer for the stepper.
 * The storage key allows to save the step when the user
 * move from a step to another.
 */
const reducer =
  (steps: number) => (state: StepperState, action: StepperAction) => {
    switch (action.type) {
      case "close": {
        return {
          ...state,
          step: 0,
          isNextDisable: true,
          progress: false,
          open: false,
          isBackEnable: true,
        };
      }

      case "open": {
        return {
          ...state,
          step: 0,
          isNextDisable: true,
          progress: false,
          open: true,
          isBackEnable: true,
        };
      }

      case "loading": {
        if (action.step >= steps) {
          return {
            ...state,
            step: 0,
            isNextDisable: true,
            progress: false,
            open: false,
            isBackEnable: true,
          };
        }

        // WebStorage.set(storageKey, action.step);

        return {
          ...state,
          step: action.step,
          isNextDisable: true,
          progress: true,
          isBackEnable: action.step != steps - 1,
        };
      }

      case "next": {
        return {
          ...state,
          progress: false,
        };
      }

      case "toggle-next": {
        return {
          ...state,
          isNextEnable: action.isNextEnable,
        };
      }
    }
  };

export function useStepperReducer(steps: number) {
  const [state, dispatch] = useReducer<Reducer<StepperState, StepperAction>>(
    reducer(steps),
    {
      step: 0,
      isNextEnable: false,
      progress: false,
      open: false,
    }
  );

  return { state, dispatch };
}
