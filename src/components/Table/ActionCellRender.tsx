import { SimpleText } from "../SimpleText/SimpleText";

export const ActionCellRender =
  (action: string, onClick: (row: string[]) => void) =>
  (_: string, row: string[]) => {
    return (
      <a href="#" onClick={() => onClick(row)} className="cell--action">
        <SimpleText variant="primary" bold={true}>
          {action}
        </SimpleText>
      </a>
    );
  };
