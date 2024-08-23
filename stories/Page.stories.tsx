import type { Meta, StoryObj } from "@storybook/react";
import { Page } from "../src/components/Page/Page";
import "./Page.stories.css";

const meta = {
  title: "Layouts/Page",
  component: Page,
  parameters: {
    layout: "fullwidth",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <span style={{ padding: "1rem", display: "block" }}>Hello World</span>
    ),
  },
};
