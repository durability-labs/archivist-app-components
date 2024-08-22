type Mapping = { [k: string]: "success" | "warning" | "error" | "default" };

export const StateCellRender = (mapping: Mapping) => (value: string) => {
  return (
    <p>
      <span className={"cell-state cell-state--" + mapping[value]}>
        {value}
      </span>
    </p>
  );
};
