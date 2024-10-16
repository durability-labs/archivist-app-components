import "./table.css";
import { ArrowDownUp, Search } from "lucide-react";
import { Row, RowProps } from "./Row";
import { Fragment, ReactElement, useState } from "react";
import { classnames } from "../utils/classnames";

type State = "asc" | "desc" | "";

type Props = {
  /**
   * List of header names
   * Can be a string array ["id", "actions"]
   * Or a tuple containing the sort function with the column
   * index in argument
   */
  headers: string[] | [string, ((state: State) => void)?][];

  /**
   * Default: -1
   */
  defaultSortIndex?: number;

  className?: string;

  rows: ReactElement<RowProps, typeof Row>[];
};

const nextState = (state: "asc" | "desc" | "") => {
  switch (state) {
    case "":
      return "desc";
    case "asc":
      return "";
    case "desc":
      return "asc";
  }
};

export function Table({
  headers,
  rows,
  defaultSortIndex = -1,
  className = "",
}: Props) {
  const [sortSelected, setSortSelected] = useState([defaultSortIndex, "asc"]);

  const onFilterSelected = (col: number) => {
    const [currentCol, currentState] = sortSelected;

    if (col !== currentCol) {
      setSortSelected([col, "desc"]);
      return;
    }

    const nxt = nextState(currentState as State);

    if (nxt === "") {
      setSortSelected([-1, ""]);
    } else {
      setSortSelected([col, nxt]);
    }
  };

  return (
    <div className={`table-container ${className}`}>
      <table className={"table"}>
        <thead className="table-thead">
          <tr className="table-theadTr">
            {headers.map((col, index) => {
              const [name, sort] = Array.isArray(col) ? col : [col];
              const state = index === sortSelected[0] ? sortSelected[1] : "";
              const nxt = nextState(state as State);

              return (
                <th
                  className={classnames(
                    ["table-theadTh"],
                    ["table-theadTh--clickable", !!sort]
                  )}
                  key={name}
                  onClick={() => {
                    onFilterSelected(index);
                    sort?.(nxt);
                  }}
                >
                  <div className="table-theadTh-content">
                    <span>{name}</span>
                    {sort && (
                      <ArrowDownUp
                        className={"table-theadTh-icon--" + state}
                        size={"1rem"}
                      ></ArrowDownUp>
                    )}
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
        <div className="table-placeholder">
          <Search />
          <p className="table-placeholderText">No data.</p>
        </div>
      )}
    </div>
  );
}
