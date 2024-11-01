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
import { Input } from "../Input/Input";
import { classnames } from "../utils/classnames";

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

  label: string;

  id: string;
};

export function Dropdown({
  placeholder,
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
    <div className={"dropdown " + className}>
      <label htmlFor={id}>{label}</label>

      <div>
        <Backdrop onClose={onClose} open={focused} />

        <Input
          ref={inputRef}
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

        <ul {...attr}>
          {filtered.length ? (
            filtered.map((o) => (
              <li onClick={() => onSelect(o)} key={o.title}>
                {o.Icon && <o.Icon />}
                <span>{o.title}</span>
                {o.subtitle && <span>{o.subtitle}</span>}
              </li>
            ))
          ) : (
            <p>No results found</p>
          )}
        </ul>
      </div>
    </div>
  );
}
