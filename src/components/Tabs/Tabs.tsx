import { ComponentType } from "react";
import "./tabs.css";
import { classnames } from "../utils/classnames";
import { attributes } from "../utils/attributes";

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
          {...attributes({ "aria-selected": tabIndex === index })}
          className={classnames([tab.className || ""])}
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
