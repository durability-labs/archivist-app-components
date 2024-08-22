import prettyMilliseconds from "pretty-ms";

export function DurationCellRender(value: string) {
  const ms = parseInt(value, 10);
  if (isNaN(ms)) {
    return "Nan";
  }

  return prettyMilliseconds(ms, { compact: true });
}
