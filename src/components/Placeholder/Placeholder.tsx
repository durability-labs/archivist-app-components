import { ReactNode } from "react";
import { Button } from "../Button/Button";
import "./placeholder.css";

type Props = {
  title: string;

  subtitle?: string;

  message: string;

  /**
   * If a retry function is passed to the component,
   * a button will be displayed and the function will be called when the button
   * is clicked.
   */
  onRetry?: () => void | Promise<void>;

  /**
   * Icon to be displayed on top of the text
   */
  Icon: ReactNode;

  className?: string;
};

export function Placeholder({
  title,
  message,
  Icon,
  subtitle,
  className = "",
  onRetry,
}: Props) {
  return (
    <div className={"placeholder " + className}>
      <div>{Icon}</div>
      <b>{title}</b>

      {subtitle && <p>subtitle</p>}

      <div className="placeholder-message">{message} </div>

      {onRetry && (
        <Button
          label="Retry"
          onClick={onRetry}
          className="placeholder-button"
        />
      )}
    </div>
  );
}
