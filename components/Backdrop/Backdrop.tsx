import { CSSProperties, useEffect } from "react";
import { attributes } from "../../utils/attributes";
import "./backdrop.css";
import React from "react";

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
};

export function Backdrop({ open, onClose, style }: Props) {
  const attr = attributes({ "aria-expanded": open });

  useEffect(() => {
    document.documentElement.classList.toggle("document-noOverflow");
  }, [open]);

  return (
    <div {...attr} className="backdrop" onClick={onClose} style={style}></div>
  );
}
