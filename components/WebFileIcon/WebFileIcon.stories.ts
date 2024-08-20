import type { Meta, StoryObj } from "@storybook/react";
import { WebFileIcon } from "./WebFileIcon";

const meta = {
  title: "Example/WebFileIcon",
  component: WebFileIcon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof WebFileIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Audio: Story = {
  args: {
    type: "audio/mp3",
  },
};

export const Image: Story = {
  args: {
    type: "image/jpeg",
  },
};

export const Video: Story = {
  args: {
    type: "video/mp4",
  },
};

export const Pdf: Story = {
  args: {
    type: "application/pdf",
  },
};

export const Excel: Story = {
  args: {
    type: "application/vnd.ms-excel",
  },
};

export const Doc: Story = {
  args: {
    type: "application/msdoc",
  },
};

export const Other: Story = {
  args: {
    type: "text/plain",
  },
};

export const CustomSize: Story = {
  args: {
    type: "image/jpeg",
    size: 64,
  },
};
