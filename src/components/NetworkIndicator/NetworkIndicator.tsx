import { classnames } from "../utils/classnames";
import "./networkIndicator.css";

type Props = {
  online: boolean;
  text: string;
};

export function NetworkIndicator({ online, text }: Props) {
  return (
    <div className="networkIndicator">
      <div
        className={classnames(
          ["networkIndicator-point"],
          ["networkIndicator-point--online", online],
          ["networkIndicator-point--offline", !online]
        )}
      ></div>
      <span>{text}</span>
    </div>
  );
}
