import { ComponentType } from "react";
import "./tabs.css";
import { classnames } from "../utils/classnames";

export type TabProps = {
  label: string;
  className?: string;
  Icon?: ComponentType;
  IconAfter?: ComponentType<{ onClick?: () => void }>;
};

type Props = {
  tabs: TabProps[];

  onTabChange: (index: number) => void | Promise<void>;

  /**
   * Current tab selected index
   */
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
            ["tabs-tab--active", tabIndex === index],
            [tab.className || ""]
          )}
          onClick={() => onTabChange(index)}
        >
          {tab.Icon && <tab.Icon />}
          <span>{tab.label}</span>
          {tab.IconAfter && <tab.IconAfter />}
        </div>
      ))}
    </div>
  );
}
