import type { Meta, StoryObj } from "@storybook/react";
import { Table } from "../src/components/Table/Table";
import "./Table.stories.css";
import { Row } from "../src/components/Table/Row";
import { Cell } from "../src";

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
    rows: [
      <Row
        cells={[
          <Cell>Ox45678FDGHJKLBSA21</Cell>,
          <Cell>My file</Cell>,
          <Cell>Some data</Cell>,
          <Cell>Some data</Cell>,
        ]}
      ></Row>,
    ],
    headers: ["id", "title", "other"],
  },
};

export const Scroll: Story = {
  args: {
    className: "tableSmall",
    rows: [
      <Row
        cells={[
          <Cell>Ox45678FDGHJKLBSA21</Cell>,
          <Cell>My file</Cell>,
          <Cell>Some data</Cell>,
          <Cell>Some data</Cell>,
        ]}
      ></Row>,
    ],
    headers: ["id", "title", "other", "actions"],
  },
};

export const Sort: Story = {
  args: {
    className: "tableSmall",
    rows: [
      <Row
        cells={[
          <Cell>Ox45678FDGHJKLBSA22</Cell>,
          <Cell>My file</Cell>,
          <Cell>1</Cell>,
          <Cell>Some data</Cell>,
        ]}
      ></Row>,
      <Row
        cells={[
          <Cell>Ox45678FDGHJKLBSA23</Cell>,
          <Cell>My file</Cell>,
          <Cell>2</Cell>,
          <Cell>Some data</Cell>,
        ]}
      ></Row>,
    ],
    headers: [["id"], ["title"], ["other", () => {}], ["actions"]],
  },
};

export const Empty: Story = {
  args: {
    rows: [],
    headers: ["id", "title", "state", "actions"],
  },
};
