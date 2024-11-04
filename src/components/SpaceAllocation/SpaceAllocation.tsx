import "./spaceAllocation.css";

export type SpaceAllocationItem = {
  // The title displayed
  title: string;

  // The dataset size
  size: number;

  // The custom classname
  className?: string;

  // The color can be any html color value valid,
  // rgb, hexa...
  color: string;
};

type Props = {
  data: SpaceAllocationItem[];
};

export function SpaceAllocation({ data }: Props) {
  const total = data.reduce((acc, val) => acc + val.size, 0);

  return (
    <div className="space-allocation">
      <header>
        {data.map((d) => (
          <span
            key={d.title}
            className={`${d.className || ""}`}
            style={{
              width: (d.size / total) * 100 + "%",
              backgroundColor: d.color,
            }}
          ></span>
        ))}
      </header>

      <ul>
        {data.map((d) => (
          <li key={d.title}>
            <span style={{ backgroundColor: d.color }}></span>
            <p>
              <span>{d.title}</span>
              {/* <small> {PrettyBytes(d.size)}</small> */}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
