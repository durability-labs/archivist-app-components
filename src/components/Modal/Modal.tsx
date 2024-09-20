import { ReactNode } from "react";
import { Backdrop } from "../Backdrop/Backdrop";
import { Button } from "../Button/Button";
import { classnames } from "../utils/classnames";
import "./modal.css";

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
};

export function Modal({
  open,
  onClose,
  disableActionButton,
  disableCloseButton,
  displayCloseButton = true,
  displayActionButton = false,
  labelActionButton = "Action",
  labelCloseButton = "Close",
  children,
  onAction,
}: Props) {
  return (
    <>
      <Backdrop open={open} onClose={onClose} removeScroll={true} />

      <div className={classnames(["modal"], ["modal--open", open])}>
        <div className="modal-body">{children}</div>

        <div
          className={classnames(
            ["modal-buttons--between", !!onAction],
            ["modal-buttons--center", !onAction]
          )}
        >
          {displayCloseButton && (
            <Button
              label={labelCloseButton}
              variant="outline"
              onClick={onClose}
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
        </div>
      </div>
    </>
  );
}
