import { PrettyBytes } from "../../utils/bytes";
import "./spaceAllocation.css";
import React from "react";

type Props = {
  data: {
    title: string;
    percent: number;
    size: number;
  }[];
};

export function SpaceAllocation({ data }: Props) {
  return (
    <>
      <div className="nodeSpaceAllocation-bar">
        {data.map((d, index) => (
          <span
            className={`nodeSpaceAllocation-barItem nodeSpaceAllocation-barQuota nodeSpaceAllocation-quota-${index}`}
            style={{ width: d.percent + "%" }}
          ></span>
        ))}
      </div>

      <div className="nodeSpaceAllocation-legend">
        {data.map((d, index) => (
          <div className="nodeSpaceAllocation-legendRow">
            <div className="nodeSpaceAllocation-legendLeft">
              <div
                className={`nodeSpaceAllocation-legendItem nodeSpaceAllocation-quota nodeSpaceAllocation-quota-${index}`}
              ></div>
              <span>{d.title}</span>
            </div>
            <small>{PrettyBytes(d.size)}</small>
          </div>
        ))}
      </div>
    </>
  );
}
