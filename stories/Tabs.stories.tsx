import type { Meta } from "@storybook/react";
import { useState } from "react";
import AllFilesIcon from "../src/assets/icons/all.svg?react";
import FavoriteIcon from "../src/assets/icons/favorite.svg?react";

import { Tabs } from "../src/components/Tabs/Tabs";
import { fn } from "@storybook/test";

const meta = {
  title: "Components/Tabs",
  component: Tabs,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: { onTabChange: fn() },
} satisfies Meta<typeof Tabs>;

export default meta;

const Template = (props: { onTabChange: () => void }) => {
  const [tabIndex, setTabIndex] = useState(0);

  const onTabChange = (index: number) => {
    props.onTabChange();
    setTabIndex(index);
  };

  return (
    <div>
      <Tabs
        onTabChange={onTabChange}
        tabIndex={tabIndex}
        tabs={[
          {
            label: "All files",
            Icon: () => <AllFilesIcon></AllFilesIcon>,
          },
          {
            label: "Favorites",
            Icon: () => <FavoriteIcon></FavoriteIcon>,
          },
        ]}
      />
    </div>
  );
};

export const Default = Template.bind({});
