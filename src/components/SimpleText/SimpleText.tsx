import { CSSProperties, ReactNode } from "react";
import "./simpleText.css";

interface CustomStyleCSS extends CSSProperties {
  "--codex-color"?: string;
  "--codex-color-primary"?: string;
  "--codex-color-light"?: string;
  "--codex-color-error"?: string;
  "--codex-color-warning"?: string;
}

type Props = {
  /**
   * Default variant is normal
   */
  variant?: "normal" | "primary" | "light" | "error" | "warning";

  className?: string;

  children: string | ReactNode;

  /**
   * Apply custom css variables.
   * --codex-color
   * --codex-color-primary
   * --codex-color-light
   * --codex-color-error
   * --codex-color-warning
   */
  style?: CustomStyleCSS;

  size?: "normal" | "small";

  center?: boolean;

  bold?: boolean;

  onClick?: () => void;
};

export function SimpleText({
  variant = "normal",
  className = "",
  center,
  size = "normal",
  onClick,
  style,
  children,
  bold,
}: Props) {
  const c = `text text--${variant} ${className} ${center ? "text--center" : ""} ${bold ? "text--bold" : ""}`;

  if (size === "small") {
    return (
      <small onClick={onClick} className={c} style={style}>
        {children}
      </small>
    );
  }

  return (
    <span onClick={onClick} className={c} style={style}>
      {children}
    </span>
  );
}
