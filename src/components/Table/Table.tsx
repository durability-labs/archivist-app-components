import { ReactNode } from "react";
import "./Table.css";
import { CellRender } from "./CellRender";

type Props = {
  /**
   * List of header names
   */
  headers: string[];

  /**
   * The data are represented by a 2 dimensions array.
   * Each row contains a dataset whose data structure is a string array.
   */
  data: string[][];

  /**
   * The cell render is an array of function that returns the cell data.
   */
  cells: CellRender[];

  className?: string;
};

export function Table({ data, headers, cells, className }: Props) {
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
          {data.map((row, index) => (
            <tr key={index} className="table-tbodyTr">
              {headers.map((header, idx) => {
                const render = cells[idx];

                return (
                  <td key={header} className="table-tbodyTd">
                    {render(row[idx], row, index)}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
