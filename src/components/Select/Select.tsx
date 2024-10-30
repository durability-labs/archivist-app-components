import { ChangeEvent } from "react";
import "./select.css";

type Props = {
  label: string;

  id: string;

  /**
   * Tuple array for options.
   * The first item is the value and the second is the text.
   */
  options: [string, string][];

  /**
   * OnChange event called whenever the select value changed.
   */
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void | Promise<void>;

  onFocus?: () => void | Promise<void>;

  onBlur?: () => unknown | Promise<unknown>;

  onMouseEnter?: () => void;

  onMouseLeave?: () => void;

  defaultValue?: string;

  value: string;

  className?: string;
};

export function Select({
  label,
  id,
  options,
  onChange,
  onBlur,
  onFocus,
  onMouseEnter,
  onMouseLeave,
  className = "",
  defaultValue,
  value,
}: Props) {
  return (
    <div className={"select " + className}>
      <label htmlFor={id}>{label}</label>
      <select
        id={id}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        defaultValue={defaultValue}
        value={value}
      >
        {options.map(([oval, text]) => (
          <option key={oval} value={oval}>
            {text}
          </option>
        ))}
      </select>
    </div>
  );
}
