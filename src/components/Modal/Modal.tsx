import { ComponentType, ReactNode, useEffect, useState } from "react";
import { Backdrop } from "../Backdrop/Backdrop";
import { Button } from "../Button/Button";
import { classnames } from "../utils/classnames";
import "./modal.css";
import CloseIcon from "../../assets/icons/close.svg?react";
import { ButtonIcon } from "../ButtonIcon/ButtonIcon";

type Props = {
  open: boolean;

  /**
   * Event triggered whenever the close button is clicked.
   */
  onClose: () => void;

  /**
   * If true the close button will be displayed
   * Default: true
   */
  displayCloseButton?: boolean;

  /**
   * If true, the action button will be disabled.
   * Default: false
   */
  displayActionButton?: boolean;

  /**
   * Event triggered whenever the action button is clicked.
   * The action button should be considered the "primary" action.
   */
  onAction?: () => void;

  /**
   * Change the label of the close button.
   * Default: Close
   */
  labelCloseButton?: string;

  /**
   * If true, the disable button will be disabled.
   */
  disableCloseButton?: boolean;

  /**
   * Change the label of the close button.
   * Default: Action
   */
  labelActionButton?: string;

  /**
   * If true, the action button will be disabled.
   */
  disableActionButton?: boolean;

  children: ReactNode;

  className?: string;

  title?: string;

  Icon?: ComponentType<{ width: number | string | undefined }>;
};

export function Modal({
  open,
  onClose,
  disableActionButton,
  disableCloseButton,
  className = "",
  displayCloseButton = true,
  displayActionButton = false,
  labelActionButton = "Action",
  labelCloseButton = "Close",
  children,
  title,
  Icon,
  onAction,
}: Props) {
  const [internalOpen, setInternalOpen] = useState(open);

  useEffect(() => {
    setInternalOpen(open);
  }, [open]);

  const internalClose = () => {
    setInternalOpen(false);
    setTimeout(onClose, 250);
  };

  return (
    <div
      className={classnames(
        ["modal"],
        ["modal--internalOpen", internalOpen],
        ["modal--open", open],
        ["modal--actions", !!onAction],
        [className]
      )}
    >
      <Backdrop open={internalOpen} onClose={internalClose} />

      <dialog>
        {title && (
          <header>
            <div>
              {Icon && <Icon width={24}></Icon>}
              <h6>{title}</h6>
            </div>
            <ButtonIcon
              onClick={internalClose}
              Icon={CloseIcon}
              variant="small"
            ></ButtonIcon>
          </header>
        )}

        <main>{open && children}</main>

        {displayCloseButton ||
          (displayActionButton && (
            <footer>
              {displayCloseButton && (
                <Button
                  label={labelCloseButton}
                  variant="outline"
                  onClick={internalClose}
                  disabled={disableCloseButton}
                />
              )}

              {displayActionButton && (
                <Button
                  label={labelActionButton}
                  onClick={onAction}
                  disabled={disableActionButton}
                />
              )}
            </footer>
          ))}
      </dialog>
    </div>
  );
}
