import { ReactNode } from "react";
import "./CellRender.css";

export type CellRender = (
  value: string,
  row: string[],
  index: number
) => ReactNode;

export const DefaultCellRender = (val: string) => val;
