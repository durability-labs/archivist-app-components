import { ComponentType } from "react";
import "./button.css";
import { attributes } from "../utils/attributes";

type Props = {
  /**
   * Button style variant. Default is primary.
   */
  variant?: "outline" | "primary";

  onClick?: () => unknown | Promise<unknown>;

  onMouseEnter?: () => unknown | Promise<unknown>;

  onMouseLeave?: () => unknown | Promise<unknown>;

  label: string;

  /**
   * Boolean to indicate that some work is in progress.
   * It will display an indicator in the button.
   * Default is false.
   */
  fetching?: boolean;

  /**
   * Default is false.
   */
  disabled?: boolean;

  /**
   * Add an icon before the label.
   */
  Icon?: ComponentType;

  IconAfter?: ComponentType;

  /**
   * Apply custom classname.
   */
  className?: string;

  size?: "medium" | "small";
};

export function Button({
  label,
  className = "",
  Icon,
  IconAfter,
  onMouseEnter,
  onMouseLeave,
  size = "medium",
  fetching = false,
  disabled = false,
  variant = "primary",
  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`button ${className} button--${variant} button--${size}`}
      {...attributes({
        disabled: disabled || fetching,
        "aria-disabled": disabled || fetching,
        "aria-busy": fetching,
      })}
    >
      {Icon && <Icon />}
      <span>{label}</span>
      {IconAfter && <IconAfter />}
    </button>
  );
}
