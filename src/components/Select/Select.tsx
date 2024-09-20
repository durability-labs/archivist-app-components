import { ChangeEvent, CSSProperties } from "react";
import "./select.css";

interface CustomStyleCSS extends CSSProperties {
  "--codex-select-background"?: string;
  "--codex-color"?: string;
  "--codex-border-radius"?: string;
  "--codex-select-border"?: string;
  "--codex-select-icon-url"?: string;
}

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

  /**
   * Apply custom css variables.
   */
  style?: CustomStyleCSS;

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
  style,
  className,
  defaultValue,
  value,
}: Props) {
  return (
    <>
      <label htmlFor={id} className="select-label">
        {label}
      </label>
      <div>
        <select
          id={id}
          className={`select ${className}`}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          style={style}
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
    </>
  );
}
