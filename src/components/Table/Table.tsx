import "./table.css";
import { Search } from "lucide-react";
import { Row, RowProps } from "./Row";
import { Fragment, ReactElement } from "react";

type Props = {
  /**
   * List of header names
   */
  headers: string[];

  className?: string;

  rows: ReactElement<RowProps, typeof Row>[];
};

export function Table({ headers, rows, className = "" }: Props) {
  return (
    <div className={`table-container ${className}`}>
      <table className={"table"}>
        <thead className="table-thead">
          <tr className="table-theadTr">
            {headers.map((col) => (
              <th className="table-theadTh" key={col}>
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((Row, index) => (
            <Fragment key={index}>{Row}</Fragment>
          ))}
        </tbody>
      </table>

      {!rows.length && (
        <div className="table-placeholder">
          <Search />
          <p className="table-placeholderText">No data.</p>
        </div>
      )}
    </div>
  );
}
