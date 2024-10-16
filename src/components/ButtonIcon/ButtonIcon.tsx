import {
  AnimationEventHandler,
  ComponentType,
  CSSProperties,
  useState,
} from "react";
import "./buttonIcon.css";
import { attributes } from "../utils/attributes";

interface CustomStyleCSS extends CSSProperties {
  "--codex-button-icon-background"?: string;
  "--codex-border-color"?: string;
  "--codex-color-disabled"?: string;
}

type Props = {
  Icon: ComponentType<{
    className?: string;
    onAnimationEnd?: AnimationEventHandler | undefined;
  }>;

  variant?: "big" | "small";

  onClick?: () => void;

  onMouseEnter?: () => unknown | Promise<unknown>;

  onMouseLeave?: () => unknown | Promise<unknown>;

  disabled?: boolean;

  /**
   * Apply custom css variables.
   * --codex-button-icon-background
   * --codex-border-color
   * --codex-color-disabled
   */
  style?: CustomStyleCSS;

  /**
   * Apply custom classname.
   */
  className?: string;

  /**
   * Apply an animation on click
   */
  animation?: "buzz" | "bounce";
};

export function ButtonIcon({
  Icon,
  onClick,
  style,
  onMouseEnter,
  onMouseLeave,
  className = "",
  animation,
  disabled = false,
  variant = "big",
}: Props) {
  const [animationClassName, setAnimationClassName] = useState("");

  const onInternalClick = () => {
    setAnimationClassName("buttonIcon--" + animation);
    onClick?.();
  };

  const onAnimationEnd = () => setAnimationClassName("");

  return (
    <button
      className={`buttonIcon buttonIcon--${variant} ${className}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onInternalClick}
      style={style}
      {...attributes({ disabled: disabled, "aria-disabled": disabled })}
    >
      <Icon className={animationClassName} onAnimationEnd={onAnimationEnd} />
    </button>
  );
}
