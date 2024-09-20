import { SimpleText } from "../SimpleText/SimpleText";
import { PrettyBytes } from "../utils/bytes";
import "./spaceAllocation.css";

type Props = {
  data: {
    title: string;
    size: number;
  }[];
};

export function SpaceAllocation({ data }: Props) {
  const total = data.reduce((acc, val) => acc + val.size, 0);

  return (
    <>
      <div className="nodeSpaceAllocation-bar">
        {data.map((d, index) => (
          <span
            key={d.title}
            className={`nodeSpaceAllocation-barItem nodeSpaceAllocation-barQuota nodeSpaceAllocation-quota-${index}`}
            style={{ width: (d.size / total) * 100 + "%" }}
          ></span>
        ))}
      </div>

      <div className="nodeSpaceAllocation-legend">
        {data.map((d, index) => (
          <div key={d.title} className="nodeSpaceAllocation-legendRow">
            <div
              className={`nodeSpaceAllocation-legendItem nodeSpaceAllocation-quota nodeSpaceAllocation-quota-${index}`}
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
