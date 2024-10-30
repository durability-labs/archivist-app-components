import { AnimationEventHandler, ComponentType, useState } from "react";
import "./buttonIcon.css";
import { attributes } from "../utils/attributes";

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
      {...attributes({ disabled: disabled, "aria-disabled": disabled })}
    >
      <Icon className={animationClassName} onAnimationEnd={onAnimationEnd} />
    </button>
  );
}
