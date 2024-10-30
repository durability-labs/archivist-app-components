import { ReactNode } from "react";
import "./card.css";

type Props = {
  children: ReactNode;

  className?: string;

  title: string;
};

export function Card({ children, className = "", title }: Props) {
  return (
    <div className={`card ${className}`}>
      <header>{title}</header>
      <div>{children}</div>
    </div>
  );
}
