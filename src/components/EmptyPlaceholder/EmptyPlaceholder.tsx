import { Placeholder } from "../Placeholder/Placeholder";
import { EmptyPlaceholderIcon } from "./EmptyPlaceholderIcon";

type Props = {
  title: string;

  message: string;

  /**
   * If a retry function is passed to the component,
   * a button will be displayed and the function will be called when the button
   * is clicked.
   */
  onRetry?: () => void | Promise<void>;
};

export function EmptyPlaceholder({ title, message, onRetry }: Props) {
  return (
    <Placeholder
      title={title}
      message={message}
      onRetry={onRetry}
      Icon={<EmptyPlaceholderIcon width={178} />}
    ></Placeholder>
  );
}
