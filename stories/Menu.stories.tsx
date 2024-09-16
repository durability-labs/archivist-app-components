import type { Meta } from "@storybook/react";
import {
  Menu,
  MenuItem,
  MenuItemComponentProps,
} from "../src/components/Menu/Menu";
import { useState } from "react";
import { fn } from "@storybook/test";
import {
  HelpCircle,
  Home,
  Server,
  Settings,
  ShoppingBag,
  Star,
} from "lucide-react";
import "./Menu.stories.css";

const meta = {
  title: "Overlays/Menu",
  component: Menu,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {
    onClose: fn(),
    onOpen: fn(),
  },
} satisfies Meta<typeof Menu>;

export default meta;

type Props = {
  onClose: () => void;
  onOpen: () => void;
};

const Template = (p: Props) => {
  const [open, setOpen] = useState(false);

  const onClose = () => {
    p.onClose();
    setOpen(false);
  };

  const onOpen = () => {
    setOpen(true);
  };

  const items = [
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
  ] satisfies MenuItem[];

  return (
    <div className="menu-story">
      <button onClick={onOpen}>Open menu</button>
      <Menu
        expanded={open}
        onClose={onClose}
        onOpen={p.onOpen}
        items={items}
        className="menu-noSticky"
        version="1.0.0"
      ></Menu>
    </div>
  );
};

export const Default = Template;
