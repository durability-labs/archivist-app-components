import {
  ChangeEvent,
  ComponentType,
  CSSProperties,
  forwardRef,
  KeyboardEvent,
} from "react";
import { attributes } from "../utils/attributes";
import { classnames } from "../utils/classnames";
import "./input.css";
import { SimpleText } from "../SimpleText/SimpleText";

export interface InputCustomStyleCSS extends CSSProperties {
  "--codex-input-background"?: string;
  "--codex-color"?: string;
  "--codex-border-radius"?: string;
  "--codex-input-border"?: string;
  "--codex-color-primary"?: string;
  "--codex-input-background-disabled"?: string;
}

type Props = {
  label?: string;

  id: string;

  /**
   * OnChange event triggered every time the input value changed.
   */
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void | Promise<void>;

  onFocus?: () => void | Promise<void>;

  onBlur?: () => unknown | Promise<unknown>;

  onClick?: (() => void) | undefined;

  onMouseEnter?: () => void;

  onMouseLeave?: () => void;

  onKeyUp?: (e: KeyboardEvent<HTMLInputElement>) => void;

  placeholder?: string;

  value?: string;

  /**
   * Apply custom css variables.
   * --codex-input-background
   * --codex-color
   * --codex-border-radius
   * --codex-input-border
   * --codex-color-primary
   * --codex-input-background-disabled
   */
  style?: InputCustomStyleCSS;

  /**
   * Helper text to add indication about your input.
   */
  helper?: string;

  disabled?: boolean;

  /**
   * Add an icon on the left.
   */
  Icon?: ComponentType;

  /**
   * Apply a class to the input element
   */
  inputClassName?: string;

  /**
   * Default is text
   */
  type?: string;

  step?: string;

  name?: string;

  min?: number | string;

  max?: number | string;
};

export const Input = forwardRef<HTMLInputElement, Props>(
  (
    {
      id,
      label,
      helper,
      disabled,
      value,
      onBlur,
      onFocus,
      placeholder,
      onChange,
      onMouseEnter,
      onMouseLeave,
      onClick,
      onKeyUp,
      style,
      Icon,
      step,
      name,
      inputClassName,
      type = "text",
      min,
      max,
    },
    ref
  ) => {
    return (
      <>
        {label && (
          <label className="input-label" htmlFor={id}>
            {label}
          </label>
        )}

        <div className={classnames(["input-icon", !!Icon])}>
          {Icon && (
            <div className="input-iconElement">
              <Icon />
            </div>
          )}
          <input
            id={id}
            name={name}
            ref={ref}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            className={classnames(
              ["input"],
              ["input-icon-input", !!Icon],
              [inputClassName || ""]
            )}
            style={style}
            {...attributes({
              disabled,
              "aria-disabled": disabled,
            })}
            value={value}
            placeholder={placeholder}
            onBlur={onBlur}
            onFocus={onFocus}
            onChange={onChange}
            onKeyUp={onKeyUp}
            type={type}
            step={step}
            min={min}
            max={max}
          />
        </div>

        {helper && (
          <div>
            <SimpleText className="input-helper-text" variant="light">
              {helper}
            </SimpleText>
          </div>
        )}
      </>
    );
  }
);
