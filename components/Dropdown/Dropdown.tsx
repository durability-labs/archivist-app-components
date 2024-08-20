import { ChangeEvent, ComponentType, useState } from "react";
import "./dropdown.css";
import { attributes } from "../../utils/attributes";
import { Backdrop } from "../Backdrop/Backdrop";
import React from "react";
import { Input, InputCustomStyleCSS } from "../Input/Input";

interface CustomStyleCSS extends InputCustomStyleCSS {
  "--codex-dropdown-panel-background"?: string;
  "--codex-dropdown-border"?: string;
  "--codex-dropdown-option-background-hover"?: string;
}

export type DropdownOption = {
  /**
   * Dropdown option icon displayed on the left
   */
  Icon?: ComponentType;

  /**
   * Main option text elemnt
   */
  title: string;

  /**
   * Subtitle displayed under the main title of the option
   */
  subtitle?: string;
};

type Props = {
  /**
   * Placeholder used when no option is selected
   */
  placeholder: string;

  options: DropdownOption[];

  /**
   * Default value passed to the dropdown
   */
  value?: string;

  className?: string;

  /**
   * OnChange event triggered every time the text is updated
   */
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;

  /**
   * OnSelected triggered every time an option is clicked on
   */
  onSelected?: (o: DropdownOption) => void;

  /**
   * Apply custom css variables.
   * --codex-dropdown-panel-background
   * --codex-dropdown-border
   * --codex-dropdown-option-background-hover
   */
  style?: CustomStyleCSS;
};

export function Dropdown({
  placeholder,
  style,
  options,
  onChange,
  onSelected,
  value = "",
  className = "",
}: Props) {
  const lower = value.toLocaleLowerCase();
  const filtered = options.filter(
    (o) =>
      o.title.toLocaleLowerCase().includes(lower) ||
      o.subtitle?.toLocaleLowerCase().includes(lower)
  );
  const [focused, setFocused] = useState(false);

  const onFocus = () => setFocused(true);

  const onBlur = () => () => window.setTimeout(() => setFocused(false), 150);

  const onClick = (o: DropdownOption) => {
    onSelected?.(o);
    setFocused(false);
  };

  const onClose = () => setFocused(false);

  const attr = attributes({ "aria-expanded": focused });

  return (
    <div className={`dropdown ${className}`} style={style}>
      <Backdrop onClose={onClose} open={focused} />

      <Input
        className="dropdown-input"
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={placeholder}
        value={value}
        label={""}
        id={""}
      />

      <div className="dropdown-panel" {...attr}>
        {filtered.length ? (
          filtered.map((o) => (
            <div
              className="dropdown-option"
              onClick={() => onClick(o)}
              key={o.title}
            >
              {o.Icon && <o.Icon />}
              <div>
                <span className="dropdown-title">{o.title}</span>
                {o.subtitle && (
                  <span className="dropdown-subtitle">{o.subtitle}</span>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="dropdown-noResults">No results found</p>
        )}
      </div>
    </div>
  );
}
