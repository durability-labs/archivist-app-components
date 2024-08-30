import { Placeholder } from "../Placeholder/Placeholder";
import { EmptyPlaceholderIcon } from "./EmptyPlaceholderIcon";

type Props = {
  title: string;
  message: string;
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
