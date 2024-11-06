import "./table.css";
import { Search } from "lucide-react";
import { Fragment, ReactElement, ReactNode, useEffect, useState } from "react";
import { classnames } from "../utils/classnames";
import { attributes } from "../utils/attributes";
import { SortIcon } from "./SortIcon";

export type TabSortState = "asc" | "desc" | null;

type Props = {
  /**
   * List of header names
   * Can be a string array ["id", "actions"]
   * Or a tuple containing the sort function with the column
   * index in argument
   */
  headers: string[] | [string, ((state: TabSortState) => void)?][];

  /**
   * Default: -1
   */
  defaultSortIndex?: number;

  className?: string;

  rows: ReactElement<RowProps, typeof Row>[];
};

const nextState = (state: "asc" | "desc" | null) =>
  state === "desc" ? "asc" : "desc";

export function Table({
  headers,
  rows,
  defaultSortIndex = -1,
  className = "",
}: Props) {
  const [sortSelected, setSortSelected] = useState<[number, TabSortState]>([
    defaultSortIndex,
    "desc",
  ]);

  useEffect(() => {
    setSortSelected([defaultSortIndex, "desc"]);
  }, [defaultSortIndex]);

  const onFilterSelected = (col: number) => {
    const [currentCol, currentState] = sortSelected;

    if (col !== currentCol) {
      setSortSelected([col, "desc"]);
      return;
    }

    const nxt = nextState(currentState);

    if (!nxt) {
      setSortSelected([-1, null]);
    } else {
      setSortSelected([col, nxt]);
    }
  };

  return (
    <div
      className={classnames(
        ["table"],
        [className],
        ["table--empty", !!rows.length]
      )}
    >
      <table>
        <thead>
          <tr>
            {headers.map((col, index) => {
              const [name, sort] = Array.isArray(col) ? col : [col];
              const state = index === sortSelected[0] ? sortSelected[1] : null;
              const nxt = nextState(state);

              return (
                <th
                  {...attributes(
                    sort
                      ? {
                          role: "button",
                          "aria-sort":
                            state === "asc" ? "ascending" : "descending",
                        }
                      : {}
                  )}
                  key={name}
                  onClick={() => {
                    onFilterSelected(index);
                    sort?.(nxt);
                  }}
                >
                  <div>
                    <span>{name}</span>
                    {sort && <SortIcon />}
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {rows.map((Row, index) => (
            <Fragment key={index}>{Row}</Fragment>
          ))}
        </tbody>
      </table>

      {!rows.length && (
        <div>
          <Search />
          <p>No data.</p>
        </div>
      )}
    </div>
  );
}

export type CellProps = {
  children: ReactNode | string;
} & React.DetailedHTMLProps<
  React.TdHTMLAttributes<HTMLTableCellElement>,
  HTMLTableCellElement
>;

export const Cell = ({ children, className = "", ...rest }: CellProps) => (
  <td className={className} {...rest}>
    {children}
  </td>
);

export type RowProps = {
  cells: ReactElement<CellProps, typeof Cell>[];
  className?: string;
};

export function Row({ cells, className = "", ...rest }: RowProps) {
  return (
    <tr {...rest} className={className}>
      {cells.map((Cell, index) => (
        <Fragment key={index}>{Cell}</Fragment>
      ))}
    </tr>
  );
}
