import { ReactElement } from "react";
import { Backdrop } from "../Backdrop/Backdrop";
import "./sheets.css";
import { attributes } from "../utils/attributes";
import { classnames } from "../utils/classnames";

type Props = {
  open: boolean;

  onClose: () => void;

  children: ReactElement;
};

export function Sheets({ open, onClose, children }: Props) {
  const attr = attributes({ "aria-expanded": open });

  return (
    <div
      className={classnames(
        ["sheets-container"],
        ["sheets-container--open", open]
      )}
    >
      <Backdrop onClose={onClose} open={open} className={"sheets-backdrop"} />

      <div className="sheets" {...attr}>
        {children}
      </div>
    </div>
  );
}
