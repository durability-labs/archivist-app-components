import { ReactNode } from "react";
import { Button } from "../Button/Button";
import "./placeholder.css";
import { SimpleText } from "../SimpleText/SimpleText";

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
      <div className="placeholder-icon">{Icon}</div>
      <b className="placeholder-title">{title}</b>

      {subtitle && (
        <div className="placeholder-subtitle">
          <SimpleText variant="light">{subtitle}</SimpleText>
        </div>
      )}

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
