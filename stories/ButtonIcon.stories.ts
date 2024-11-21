import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { ButtonIcon } from "../src/components/ButtonIcon/ButtonIcon";
import CopyIcon from "../src/assets/icons/copy.svg?react";
import DownloadFileIcon from "../src/assets/icons/download-file.svg?react";
import PlusIcon from "../src/assets/icons/plus.svg?react";

const meta = {
  title: "Components/ButtonIcon",
  component: ButtonIcon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
    },
  },
  args: { onClick: fn(), onMouseEnter: fn(), onMouseLeave: fn() },
} satisfies Meta<typeof ButtonIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Small: Story = {
  args: {
    Icon: PlusIcon,
    variant: "small",
  },
};

export const Big: Story = {
  args: {
    Icon: PlusIcon,
    variant: "big",
  },
};

export const Disabled: Story = {
  args: {
    Icon: PlusIcon,
    disabled: true,
  },
};

export const BuzzAnimation: Story = {
  args: {
    Icon: CopyIcon,
    animation: "buzz"
  },
};

export const BounceAnimation: Story = {
  args: {
    Icon: DownloadFileIcon,
    animation: "bounce"
  },
};

export const CustomStyle: Story = {
  args: {
    Icon: PlusIcon,
    variant: "big",
  },
};
