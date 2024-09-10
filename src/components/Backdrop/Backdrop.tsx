import { CSSProperties, useEffect } from "react";
import "./backdrop.css";
import { attributes } from "../utils/attributes";

interface CustomStyleCSS extends CSSProperties {
  "--codex-background-backdrop"?: string;
}

type Props = {
  open: boolean;
  onClose: () => void;

  /**
   * Apply custom css variables.
   * --codex-background-backdrop
   */
  style?: CustomStyleCSS;

  /**
   * If true, it will remove the overflow scroll from the page when open.
   * Default: true
   */
  removeScroll?: boolean;

  className?: string;
};

export function Backdrop({
  open,
  onClose,
  style,
  className = "",
  removeScroll = true,
}: Props) {
  const attr = attributes({ "aria-expanded": open });

  useEffect(() => {
    if (removeScroll) {
      document.documentElement.classList.toggle("document-noOverflow");
    }
  }, [open, removeScroll]);

  return (
    <div
      {...attr}
      className={"backdrop " + className}
      onClick={onClose}
      style={style}
    ></div>
  );
}
