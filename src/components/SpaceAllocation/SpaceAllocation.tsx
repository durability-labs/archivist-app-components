import { SimpleText } from "../SimpleText/SimpleText";
import { PrettyBytes } from "../utils/bytes";
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
    <>
      <div className="nodeSpaceAllocation-bar">
        {data.map((d) => (
          <span
            key={d.title}
            className={`nodeSpaceAllocation-barItem nodeSpaceAllocation-barQuota ${d.className || ""}`}
            style={{
              width: (d.size / total) * 100 + "%",
              backgroundColor: d.color,
            }}
          ></span>
        ))}
      </div>

      <div className="nodeSpaceAllocation-legend">
        {data.map((d) => (
          <div key={d.title} className={"nodeSpaceAllocation-legendRow"}>
            <div
              className={`nodeSpaceAllocation-legendItem nodeSpaceAllocation-quota`}
              style={{ backgroundColor: d.color }}
            ></div>
            <div className="nodeSpaceAllocation-legendItem-text">
              <small>{d.title}</small>
              <SimpleText variant="light" size="small">
                {PrettyBytes(d.size)}
              </SimpleText>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
