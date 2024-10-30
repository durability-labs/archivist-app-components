import { ChangeEvent, LegacyRef, ReactNode } from "react";
import "./inputGroup.css";
import { Input } from "../Input/Input";
import { Select } from "../Select/Select";

type Props = {
  label: string;

  /**
   * Apply a class to the input element
   */
  inputClassName?: string;

  /**
   * Apply a class to the parent element
   */
  className?: string;

  /**
   * The group can be an tuple array (select) or a single value
   */
  group: [string, string][] | string;

  /**
   * Input type
   */
  type?: string;

  /**
   * Input value
   */
  value?: string;

  /**
   * Group value if the group is a select
   */
  groupValue?: string;

  /**
   * OnChange event triggered when the input change
   */
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;

  /**
   * OnChange event triggered when the group change if the group is a select
   */
  onGroupChange?: (e: ChangeEvent<HTMLSelectElement>) => void;

  onBlur?: () => void;

  onFocus?: () => void;

  onMouseEnter?: () => void;

  onMouseLeave?: () => void;

  id: string;

  step?: string;

  name?: string;

  /**
   * Helper text to add indication about your input.
   */
  helper?: string;

  min?: number | string;

  max?: number | string;

  inputRef?: LegacyRef<HTMLInputElement>;

  extra?: ReactNode;
};

export function InputGroup({
  label,
  name,
  helper,
  type = "text",
  group,
  className = "",
  inputClassName = "",
  onChange,
  onGroupChange,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  id,
  step,
  value = undefined,
  groupValue = "",
  inputRef,
  min,
  max,
  extra,
}: Props) {
  return (
    <div className={`inputGroup input-group ${className}`}>
      <div>
        <div>
          <div>
            <Input
              ref={inputRef}
              id={id}
              name={name}
              label={label}
              onChange={onChange}
              inputClassName={inputClassName}
              type={type}
              value={value}
              step={step}
              min={min}
              max={max}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
              onFocus={onFocus}
              onBlur={onBlur}
            />
          </div>

          <div>
            {Array.isArray(group) ? (
              <Select
                label=""
                id=""
                onChange={onGroupChange}
                className="inputGroup-select"
                value={groupValue}
                options={group}
              />
            ) : (
              <div className="inputGroup-unit">{group}</div>
            )}
          </div>
        </div>
        <p>
          <span>{helper && <small>{helper}</small>}</span>
          {extra}
        </p>
      </div>
    </div>
  );
}
