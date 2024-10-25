import {
  ChangeEvent,
  ComponentType,
  CSSProperties,
  forwardRef,
  InputHTMLAttributes,
  useState,
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
  id: string;

  label?: string;

  /**
   * Helper text to add indication about your input.
   */
  helper?: string;

  /**
   * Add an icon on the left.
   */
  Icon?: ComponentType;

  /**
   * If the mode is "auto", the component will check the invalid state
   * on change and add an invalid state if it is invalid.
   */
  mode?: "auto";

  isInvalid?: boolean;

  /**
   * Apply a class to the input element
   */
  inputClassName?: string;

  inputContainerClassName?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, Props>(
  (
    {
      id,
      label,
      helper,
      style,
      Icon,
      inputClassName,
      inputContainerClassName = "",
      disabled = false,
      onChange,
      mode,
      isInvalid = false,
      ...rest
    },
    ref
  ) => {
    const [invalid, setInvalid] = useState(isInvalid);

    const onInternalChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (mode === "auto") {
        setInvalid(e.currentTarget.checkValidity() !== true);
      }

      onChange?.(e);
    };

    return (
      <>
        {label && (
          <label className="input-label" htmlFor={id}>
            {label}
          </label>
        )}

        <div
          className={classnames(
            ["input-icon", !!Icon],
            [inputContainerClassName]
          )}
        >
          {Icon && (
            <div className="input-iconElement">
              <Icon />
            </div>
          )}
          <input
            id={id}
            ref={ref}
            className={classnames(
              ["input"],
              ["input--invalid", invalid || isInvalid],
              ["input-icon-input", !!Icon],
              [inputClassName || ""]
            )}
            onChange={onInternalChange}
            style={style}
            {...attributes({
              disabled,
              "aria-disabled": disabled,
            })}
            {...rest}
          />
        </div>

        {helper && (
          <div>
            <SimpleText
              className="input-helper-text"
              variant={invalid || isInvalid ? "error" : "light"}
            >
              {helper}
            </SimpleText>
          </div>
        )}
      </>
    );
  }
);
