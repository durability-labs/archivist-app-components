import "./alert.css";
import { CSSProperties, ReactNode } from "react";

interface CustomStyleCSS extends CSSProperties {
  "--codex-border-radius"?: string;
  "--codex-color-primary"?: string;
  "--codex-color-warning"?: string;
  "--codex-font-family"?: string;
}

type Props = {
  variant: "success" | "warning" | "toast";

  title: string;

  children: ReactNode;

  className?: string;

  /**
   * Apply custom css variables.
   * --codex-border-radius
   * --codex-color-primary: string;
   * --codex-color-warning
   * --codex-font-family
   */
  style?: CustomStyleCSS;

  Icon?: ReactNode;
};

export function Alert({
  variant,
  style,
  title,
  Icon,
  children,
  className = "",
  ...rest
}: Props) {
  return (
    <div
      className={`alert alert--${variant} ${className}`}
      style={style}
      {...rest}
    >
      {Icon && (
        <span className="alert-circleIcon">
          <span className="alert-icon">{Icon}</span>
        </span>
      )}

      <div className="alert-body">
        <b className="alert-title">{title}</b>
        <div className="alert-message">{children}</div>
      </div>
    </div>
  );
}
