import type { Meta, StoryObj } from "@storybook/react";
import { Table } from "../src/components/Table/Table";
import "./Table.stories.css";
import { StateCell } from "../src/components/Table/StateCell";
import { ActionCell } from "../src/components/Table/ActionCell";
import { BreakCell } from "../src/components/Table/BreakCell";

const meta = {
  title: "Components/Table",
  component: Table,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    cells: [
      [
        <span>Ox45678FDGHJKLBSA21</span>,
        <span>My file</span>,
        <span>Some data</span>,
        <ActionCell
          action="Action"
          onClick={() => console.info("Hello")}
        ></ActionCell>,
      ],
    ],
    headers: ["id", "title", "other", "actions"],
  },
};

export const Scroll: Story = {
  args: {
    className: "tableSmall",
    cells: [
      [
        <span>Ox45678FDGHJKLBSA21</span>,
        <span>My file</span>,
        <span>Some data</span>,
        <ActionCell
          action="Action"
          onClick={() => console.info("Hello")}
        ></ActionCell>,
      ],
    ],
    headers: ["id", "title", "other", "actions"],
  },
};

export const BreakableCell: Story = {
  args: {
    cells: [
      [
        <BreakCell value="veryverylongvaluetobreak"></BreakCell>,
        <span>My file</span>,
        <span>Some data</span>,
        <ActionCell
          action="Action"
          onClick={() => console.info("Hello")}
        ></ActionCell>,
      ],
    ],
    headers: ["break", "title", "other", "actions"],
    className: "tableSmall",
  },
};

export const State: Story = {
  args: {
    cells: [
      [
        <BreakCell value="veryverylongvaluetobreak"></BreakCell>,
        <span>My file</span>,
        <StateCell type="error" value="cancelled"></StateCell>,
        <ActionCell
          action="Action"
          onClick={() => console.info("Hello")}
        ></ActionCell>,
      ],
    ],
    headers: ["id", "title", "state", "actions"],
  },
};

export const Empty: Story = {
  args: {
    cells: [],
    headers: ["id", "title", "state", "actions"],
  },
};
