import "./Cell.css";

type Props = {
  value: string;
};

export const Cell = ({ value }: Props) => <span>{value}</span>;
