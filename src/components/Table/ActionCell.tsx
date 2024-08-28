import { SimpleText } from "../SimpleText/SimpleText";

type Props = {
  action: string;
  onClick: (data: unknown) => unknown | Promise<unknown>;
};

export const ActionCell = ({ action, onClick }: Props) => (
  <a onClick={onClick} className="cell--action">
    <SimpleText variant="primary" bold={true}>
      {action}
    </SimpleText>
  </a>
);
