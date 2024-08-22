import type { Meta, StoryObj } from "@storybook/react";
import { Table } from "../src/components/Table/Table";
import { DefaultCellRender } from "../src/components/Table/CellRender";
import { ActionCellRender } from "../src/components/Table/ActionCellRender";
import { BreakCellRender } from "../src/components/Table/BreakCellRender";
import "./Table.stories.css";
import { StateCellRender } from "../src/components/Table/StateCellRender";
import prettyMilliseconds from "pretty-ms";
import { DurationCellRender } from "../src/components/Table/DurationCellRender";

console.info(prettyMilliseconds(1337000000n, { compact: true }));

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
      DefaultCellRender,
      DefaultCellRender,
      DefaultCellRender,
      ActionCellRender("Action", (row) => console.info(row)),
    ],
    data: [["Ox45678FDGHJKL", "My file", "Some data"]],
    headers: ["id", "title", "other", "actions"],
  },
};

export const Scroll: Story = {
  args: {
    className: "tableSmall",
    cells: [
      DefaultCellRender,
      DefaultCellRender,
      DefaultCellRender,
      ActionCellRender("Action", (row) => console.info(row)),
    ],
    data: [["Ox45678FDGHJKLBSA21", "My file", "Some data"]],
    headers: ["id", "title", "other", "actions"],
  },
};

export const BreakableCell: Story = {
  args: {
    cells: [
      BreakCellRender,
      DefaultCellRender,
      DefaultCellRender,
      ActionCellRender("Action", (row) => console.info(row)),
    ],
    data: [["veryverylongvaluetobreak", "My file", "Some data"]],
    headers: ["break", "title", "other", "actions"],
    className: "tableSmall",
  },
};

export const StateCell: Story = {
  args: {
    cells: [
      DefaultCellRender,
      DefaultCellRender,
      StateCellRender({ cancelled: "error" }),
      ActionCellRender("Action", (row) => console.info(row)),
    ],
    data: [["Ox45678FDGHJKL", "My file", "cancelled", "Action"]],
    headers: ["id", "title", "state", "actions"],
  },
};

export const DurationCell: Story = {
  args: {
    cells: [
      DefaultCellRender,
      DefaultCellRender,
      DurationCellRender,
      ActionCellRender("Action", (row) => console.info(row)),
    ],
    data: [["Ox45678FDGHJKL", "My file", "3600000", "Action"]],
    headers: ["id", "title", "duration", "actions"],
  },
};
