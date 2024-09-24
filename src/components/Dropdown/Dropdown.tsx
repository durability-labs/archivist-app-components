import {
  ChangeEvent,
  ComponentType,
  useState,
  KeyboardEvent,
  useRef,
} from "react";
import "./dropdown.css";
import { attributes } from "../utils/attributes";
import { Backdrop } from "../Backdrop/Backdrop";
import { Input, InputCustomStyleCSS } from "../Input/Input";
import { classnames } from "../utils/classnames";

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

  /**
   * List of values to be displayed in the dropdown
   */
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

  onBlur?: () => void;

  onFocus?: () => void;

  onMouseEnter?: () => void;

  onMouseLeave?: () => void;

  /**
   * Apply custom css variables.
   * --codex-dropdown-panel-background
   * --codex-dropdown-border
   * --codex-dropdown-option-background-hover
   */
  style?: CustomStyleCSS;

  label: string;

  id: string;
};

export function Dropdown({
  placeholder,
  style,
  options,
  label,
  id,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  onChange,
  onSelected,
  value = "",
  className = "",
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const lower = value.toLocaleLowerCase();
  const filtered = options.filter(
    (o) =>
      o.title.toLocaleLowerCase().includes(lower) ||
      o.subtitle?.toLocaleLowerCase().includes(lower)
  );
  const [focused, setFocused] = useState(false);

  const onInternalFocus = () => {
    setFocused(true);
    onFocus?.();
  };

  const onInternalBlur = () => {
    onBlur?.();
    window.setTimeout(() => setFocused(false), 150);
  };

  const onSelect = (o: DropdownOption) => {
    onSelected?.(o);
    setFocused(false);
  };

  const onKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      onClose();
      inputRef.current?.blur();
    }
  };

  const onClose = () => setFocused(false);

  const attr = attributes({ "aria-expanded": focused });

  return (
    <>
      <label className="dropdown-label" htmlFor={id}>
        {label}
      </label>

      <div className={`dropdown ${className}`} style={style}>
        <Backdrop onClose={onClose} open={focused} />

        <Input
          ref={inputRef}
          inputClassName={classnames(["dropdown-input"])}
          onChange={onChange}
          onFocus={onInternalFocus}
          onBlur={onInternalBlur}
          onKeyUp={onKeyUp}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          placeholder={placeholder}
          value={value}
          label={""}
          id={id}
        />

        <div className="dropdown-panel" {...attr}>
          {filtered.length ? (
            filtered.map((o) => (
              <div
                className="dropdown-option"
                onClick={() => onSelect(o)}
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
    </>
  );
}
