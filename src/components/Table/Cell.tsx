import { ReactNode } from "react";
import "./cell.css";

export type CellProps = {
  children: ReactNode | string;
} & React.DetailedHTMLProps<
  React.TdHTMLAttributes<HTMLTableCellElement>,
  HTMLTableCellElement
>;

export const Cell = ({ children, className = "", ...rest }: CellProps) => (
  <td className={"cell" + className} {...rest}>
    {children}
  </td>
);
