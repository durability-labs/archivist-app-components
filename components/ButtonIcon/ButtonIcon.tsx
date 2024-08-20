import React, { ComponentType, CSSProperties } from "react";
import "./buttonIcon.css";
import { attributes } from "../../utils/attributes";

interface CustomStyleCSS extends CSSProperties {
  "--codex-button-icon-background"?: string;
  "--codex-border-color"?: string;
  "--codex-color-disabled"?: string;
}

type Props = {
  Icon: ComponentType;

  variant?: "big" | "small";

  onClick?: () => void;

  disabled?: boolean;

  /**
   * Apply custom css variables.
   * --codex-button-icon-background
   * --codex-border-color
   * --codex-color-disabled
   */
  style?: CustomStyleCSS;

  className?: string;
};

export function ButtonIcon({
  Icon,
  onClick,
  style,
  disabled = false,
  variant = "big",
}: Props) {
  return (
    <button
      className={`buttonIcon buttonIcon--${variant}`}
      onClick={onClick}
      style={style}
      {...attributes({ disabled: disabled, "aria-disabled": disabled })}
    >
      <Icon />
    </button>
  );
}
