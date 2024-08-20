import React, { ComponentType, CSSProperties, ReactNode } from "react";
import "./button.css";
import { attributes } from "../../utils/attributes";

interface CustomStyleCSS extends CSSProperties {
  "--codex-color-primary"?: string;
  "--codex-border-radius"?: string;
  "--codex-border-color"?: string;
  "--codex-font-family"?: string;
  "--codex-color-on-primary"?: string;
  "--codex-color-disabled"?: string;
  "--codex-color-outline"?: string;
  "--codex-button-loader"?: string;
  "--codex-button-background-busy"?: string;
  "--codex-button-color-box-shadow"?: string;
}

type Props = {
  /**
   * Button style variant. Default is primary.
   */
  variant?: "outline" | "primary";

  onClick?: () => unknown | Promise<unknown>;

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

  /**
   * Apply custom classname.
   */
  className?: string;

  /**
   * Apply custom css variables.
   * --codex-color-primary
   * --codex-border-radius
   * --codex-border-color
   * --codex-font-family
   * --codex-color-on-primary: The colors when the button is primary
   * --codex-color-disabled: The disabled background color
   * --codex-color-outline: The color when the button is outline
   * --codex-button-loader: The url svg image for the spinner
   * --codex-button-background-busy: The background color image when the button is busy
   * --codex-button-color-box-shadow: The shadow color on focus
   */
  style?: CustomStyleCSS;
};

export function Button({
  label,
  className = "",
  Icon,
  fetching = false,
  disabled = false,
  style,
  variant = "primary",
  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
      style={style}
      className={`button ${className} button--${variant}`}
      {...attributes({
        disabled: disabled || fetching,
        "aria-disabled": disabled || fetching,
        "aria-busy": fetching,
      })}
    >
      {Icon && (
        <div className="button-icon">
          <Icon />
        </div>
      )}
      <span className="button-label">{label}</span>
    </button>
  );
}
