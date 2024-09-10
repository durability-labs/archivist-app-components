import { ComponentType } from "react";
import "./tabs.css";
import { classnames } from "../utils/classnames";

type Props = {
  tabs: {
    label: string;
    Icon?: ComponentType<{ size?: string }>;
  }[];
  onTabChange: (index: number) => void | Promise<void>;
  tabIndex: number;
};

export function Tabs({ tabs, onTabChange, tabIndex }: Props) {
  return (
    <div className="tabs">
      {tabs.map((tab, index) => (
        <div
          key={tab.label}
          className={classnames(
            ["tabs-tab"],
            ["tabs-tab--active", tabIndex === index]
          )}
          onClick={() => onTabChange(index)}
        >
          {tab.Icon && <tab.Icon size={"1rem"} />}
          <span>{tab.label}</span>
        </div>
      ))}
    </div>
  );
}
