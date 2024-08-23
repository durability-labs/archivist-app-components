import { ReactNode, useState } from "react";
import { Menu, MenuItem, MenuItemComponentProps } from "../Menu/Menu";
import { AppBar } from "../AppBar/AppBar";
import { NetworkIndicator } from "../NetworkIndicator/NetworkIndicator";
import "./page.css";
import {
  Home,
  Star,
  ShoppingBag,
  Server,
  Settings,
  HelpCircle,
} from "lucide-react";

type Props = {
  children: ReactNode;
};

export function Page({ children }: Props) {
  const [open, setOpen] = useState(false);

  const onClose = () => {
    setOpen(false);
  };

  const onExpand = () => {
    setOpen(true);
  };

  const Right = <NetworkIndicator online={true} text="Online" />;

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
    <div className="page">
      <Menu expanded={open} onClose={onClose} items={items}></Menu>

      <main className="page-main">
        <AppBar onExpand={onExpand} Right={Right} />
        {children}
      </main>
    </div>
  );
}
