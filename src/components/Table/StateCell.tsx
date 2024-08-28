import "./StateCell.css";

type Props = {
  type: "success" | "warning" | "error" | "default";
  value: string;
};

export const StateCell = ({ type, value }: Props) => {
  return <span className={"cell-state cell-state--" + type}>{value}</span>;
};
