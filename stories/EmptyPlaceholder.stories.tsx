import type { Meta, StoryObj } from "@storybook/react";
import { EmptyPlaceholder } from "../components/EmptyPlaceholder/EmptyPlaceholder";

const meta = {
  title: "Content/EmptyPlaceholder",
  component: EmptyPlaceholder,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof EmptyPlaceholder>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Nothing to show",
    message: "No data here yet. We will notify you when there's an update.",
  },
};

export const Retry: Story = {
  args: {
    title: "Nothing to show",
    message: "No data here yet. We will notify you when there's an update.",
    onRetry: () => {},
  },
};
