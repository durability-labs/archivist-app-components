import "./Table.css";
import { ReactNode } from "react";
import { EmptyPlaceholderIcon as EPI } from "../EmptyPlaceholder/EmptyPlaceholderIcon";
import { EmptyPlaceholder } from "../EmptyPlaceholder/EmptyPlaceholder";
import { Search } from "lucide-react";

type Props = {
  /**
   * List of header names
   */
  headers: string[];

  /**
   * The ReactNode cells in two dimensions array,
   * one for the lines
   * one for the data representation
   */
  cells: ReactNode[][];

  className?: string;
};

export function Table({ headers, cells, className }: Props) {
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
          {cells.map((row, index) => (
            <tr key={index} className="table-tbodyTr">
              {headers.map((header, idx) => {
                const cell = row[idx];

                return (
                  <td key={header} className="table-tbodyTd">
                    {cell}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      {!cells.length && (
        <div className="table-placeholder">
          <Search />
          <p className="table-placeholderText">No search results.</p>
        </div>
      )}
    </div>
  );
}
