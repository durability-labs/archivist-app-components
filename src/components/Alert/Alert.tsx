import "./alert.css";
import { ReactNode } from "react";
import InfoCircleIcon from "../../assets/icons/info-circle.svg?react";

type Props = {
  variant: "success" | "warning" | "toast";

  title: string;

  children: ReactNode;

  /**
   * Apply custom classname.
   */
  className?: string;

  Icon?: ReactNode;
};

export function Alert({
  variant,
  title,
  Icon,
  children,
  className = "",
  ...rest
}: Props) {
  return (
    <div className={`alert alert--${variant} ${className}`} {...rest}>
      {Icon && (
        <span>
          <span>{Icon}</span>
        </span>
      )}

      <div>
        <b>{title}</b>
        <div>{children}</div>
      </div>

      <InfoCircleIcon></InfoCircleIcon>
    </div>
  );
}
