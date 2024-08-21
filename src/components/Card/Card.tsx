import { CSSProperties, ReactNode } from "react";
import "./card.css";

interface CustomStyleCSS extends CSSProperties {
  "--codex-border-radius"?: string;
  "--codex-border-color"?: string;
  "--codex-font-family"?: string;
}

type Props = {
  children: ReactNode;

  className?: string;

  title: string;

  /**
   * Apply custom css variables.
   * --codex-border-radius
   * --codex-border-color
   * --codex-font-family
   */
  style?: CustomStyleCSS;
};

export function Card({ children, style, className = "", title }: Props) {
  return (
    <div className={`card ${className}`} style={style}>
      <div className="card-header">{title}</div>
      <div className="card-body">{children}</div>
    </div>
  );
}
