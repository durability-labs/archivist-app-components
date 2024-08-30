import { ReactNode } from "react";
import { Button } from "../Button/Button";
import "./placeholder.css";

type Props = {
  title: string;
  message: string;
  onRetry?: () => void | Promise<void>;
  Icon: ReactNode;
  className?: string;
};

export function Placeholder({
  title,
  message,
  Icon,
  className = "",
  onRetry,
}: Props) {
  return (
    <div className={"placeholder " + className}>
      <div className="placeholder-icon">{Icon}</div>
      <b className="placeholder-title">{title}</b>
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
