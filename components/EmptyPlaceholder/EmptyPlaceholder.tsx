import { Button } from "../Button/Button";
import "./emptyPlaceholder.css";
import React from "react";
import { EmptyPlaceholderIcon } from "./EmptyPlaceholderIcon";

type Props = {
  title: string;
  message: string;
  onRetry?: () => void | Promise<void>;
};

export function EmptyPlaceholder({ title, message, onRetry }: Props) {
  return (
    <div className="emptyPlaceholder">
      <EmptyPlaceholderIcon className="emptyPlaceholder-icon" width={178} />
      <b className="emptyPlaceholder-title">{title}</b>
      <p className="emptyPlaceholder-message">{message} </p>

      {onRetry && (
        <Button
          label="Retry"
          onClick={onRetry}
          className="emptyPlaceholder-button"
        />
      )}
    </div>
  );
}
