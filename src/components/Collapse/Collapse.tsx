import { useState } from "react";
import "./Collapse.css";
import { attributes } from "../utils/attributes";

type Props = {
  /**
   * Summary always displayed
   */
  summary: string;

  /**
   * Details to show after the component is collapsed
   */
  details: string;

  /**
   * Apply custom classname.
   */
  className?: string;
};

export function Collapse({ summary, details, className = "" }: Props) {
  const [expanded, setExpanded] = useState(false);

  const onClick = () => setExpanded(!expanded);

  return (
    <div className={"collapse " + className}>
      <span className="collapse-summary" onClick={onClick}>
        {summary}
        <ArrowRight />
      </span>
      <div
        {...attributes({ "aria-expanded": expanded })}
        className={"collapse-details"}
      >
        {details}
      </div>
    </div>
  );
}

const ArrowRight = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1rem"
    height="1rem"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m6 9 6 6 6-6"></path>
  </svg>
);
