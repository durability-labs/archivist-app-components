import "./alert.css";
import { CSSProperties } from "react";

interface CustomStyleCSS extends CSSProperties {
  "--codex-border-radius"?: string;
  "--codex-color-primary"?: string;
  "--codex-color-warning"?: string;
  "--codex-font-family"?: string;
}

type Props = {
  variant: "success" | "warning" | "toast";

  message: string;

  className?: string;

  /**
   * Apply custom css variables.
   * --codex-border-radius
   * --codex-color-primary: string;
   * --codex-color-warning
   * --codex-font-family
   */
  style?: CustomStyleCSS;
};

export function Alert({
  variant,
  message,
  style,
  className = "",
  ...rest
}: Props) {
  return (
    <div
      className={`alert alert--${variant} ${className}`}
      style={style}
      {...rest}
    >
      <p>
        <b className="alert-message">{variant} ! </b>
      </p>
      <p>{message}</p>
    </div>
  );
}
