import { ReactNode } from "react";
import "./Tooltip.css";

type Props = {
  children: ReactNode;
  message: string;
  className?: string;
};

export function Tooltip({ children, message, className = "" }: Props) {
  return (
    <span className={"tooltip " + className} data-tooltip={message}>
      {children}
    </span>
  );
}
