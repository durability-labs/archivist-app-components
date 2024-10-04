import { Fragment, ReactElement } from "react";
import { Cell, CellProps } from "./Cell";
import "./row.css";

export type RowProps = {
  cells: ReactElement<CellProps, typeof Cell>[];
  className?: string;
};

export function Row({ cells, className = "" }: RowProps) {
  return (
    <tr className={"row " + className}>
      {cells.map((Cell, index) => (
        <Fragment key={index}>{Cell}</Fragment>
      ))}
    </tr>
  );
}
