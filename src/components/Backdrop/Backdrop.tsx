import "./backdrop.css";
import { attributes } from "../utils/attributes";

type Props = {
  open: boolean;

  onClose: () => void;

  className?: string;
};

export function Backdrop({ open, onClose, className = "" }: Props) {
  const attr = attributes({ "aria-expanded": open });

  return (
    <div {...attr} className={"backdrop " + className} onClick={onClose}></div>
  );
}
