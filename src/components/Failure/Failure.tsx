import "./failure.css";
import { Button } from "../Button/Button";
import { CSSProperties } from "react";

interface CustomStyleCSS extends CSSProperties {
  "--codex-code-font-size"?: string;
  "--codex-text-contrast"?: string;
  "--codex-font-family"?: string;
}

type Props = {
  code: number;
  message: string;
  title: string;
  onClick?: () => void | Promise<void>;
  button?: string;

  /**
   * Apply custom css variables.
   * --codex-code-font-size
   * --codex-text-contrast
   * --codex-font-family
   */
  style?: CustomStyleCSS;
};

export function Failure({
  code,
  message,
  onClick,
  button = "Retry",
  title = "Something went wrong",
}: Props) {
  return (
    <div className="failure">
      <h1 className="failure-code">{code}</h1>
      <h2 className="failure-title">{title}</h2>
      <div className="failure-message">{message}</div>
      {onClick && <Button label={button} onClick={onClick} />}
    </div>
  );
}
