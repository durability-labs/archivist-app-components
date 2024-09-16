import type { Meta, StoryObj } from "@storybook/react";
import { Page } from "../src/components/Page/Page";
import "./Page.stories.css";
import {
  Home,
  Star,
  ShoppingBag,
  Server,
  Settings,
  HelpCircle,
} from "lucide-react";
import { MenuItem, MenuItemComponentProps } from "../src/components/Menu/Menu";
import { NetworkIndicator } from "../src/components/NetworkIndicator/NetworkIndicator";

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
    items: [
      {
        type: "menu-item",
        Component: (p: MenuItemComponentProps) => (
          <a {...p}>
            <Home size={"1.25rem"} /> Dashboard
          </a>
        ),
      },
      {
        type: "menu-item",
        Component: (p: MenuItemComponentProps) => (
          <a {...p}>
            <Star size={"1.25rem"} /> Favorties
          </a>
        ),
      },
      {
        type: "separator",
      },
      {
        type: "menu-title",
        title: "rent",
      },
      {
        type: "menu-item",
        Component: (p: MenuItemComponentProps) => (
          <a {...p}>
            <ShoppingBag size={"1.25rem"} /> Purchases
          </a>
        ),
      },
      {
        type: "separator",
      },
      {
        type: "menu-title",
        title: "host",
      },
      {
        type: "menu-item",
        Component: (p: MenuItemComponentProps) => (
          <a {...p}>
            <Server size={"1.25rem"} /> Availabilities
          </a>
        ),
      },
      {
        type: "menu-item",
        Component: (p: MenuItemComponentProps) => (
          <a {...p}>
            <Settings size={"1.25rem"} /> Settings
          </a>
        ),
      },
      {
        type: "separator",
      },
      {
        type: "menu-item",
        Component: (p: MenuItemComponentProps) => (
          <a {...p}>
            <HelpCircle size={"1.25rem"} /> Help
          </a>
        ),
      },
    ] satisfies MenuItem[],
    Right: <NetworkIndicator online={true} text="Online" />,
    version: "1.0.0",
  },
};
