import { useEffect, useRef, useState } from "react";
import { attributes } from "../utils/attributes";
import "./toast.css";
import SuccessCircleIcon from "../../assets/icons/success-circle.svg?react";
import ErrorCircleIcon from "../../assets/icons/error-circle.svg?react";
import CloseIcon from "../../assets/icons/close.svg?react";

type Props = {
  message: string;

  /**
   * Time is the beginning time of the toast.
   * The toast will be closed after time + duration.
   * Every time a toast should be displayed a new time
   * shoukd be set.
   */
  time: number;

  /**
   * Toast duration in msec
   * Default: 3000
   */
  duration?: number;

  className?: string;

  variant: "success" | "error";
};

export function Toast({
  message,
  time,
  variant,
  className = "",
  duration = 3000,
}: Props) {
  const [msg, setMsg] = useState(message);
  const timeout = useRef<number | null>(null);

  useEffect(() => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }

    setMsg(message);

    if (message) {
      timeout.current = window.setTimeout(() => setMsg(""), duration);
    }
  }, [message, time, duration]);

  const onClose = () => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }

    setMsg("");
  };

  const icons = {
    success: SuccessCircleIcon,
    error: ErrorCircleIcon,
  };
  const Icon = icons[variant];

  return (
    <div
      className={`toast ${className} toast--${variant}`}
      {...attributes({ "aria-hidden": time == 0 || msg === "" })}
    >
      <Icon width={24} />

      <div>
        <b>{variant} ! </b>
        <span>{msg}</span>
      </div>

      <CloseIcon width={24} onClick={onClose} />
    </div>
  );
}
