import "./BreakCell.css";

type Props = {
  value: string;
};

export const BreakCell = ({ value }: Props) => (
  <span className="cell--break">{value || "  "}</span>
);
