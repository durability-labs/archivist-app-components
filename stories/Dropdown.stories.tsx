import type { Meta, StoryObj } from "@storybook/react";
import { Dropdown, DropdownOption } from "../components/Dropdown/Dropdown";
import { PdfIcon } from "../components/WebFileIcon/PdfIcon";
import { ImageIcon } from "../components/WebFileIcon/ImageIcon";
import React, { ChangeEvent, useState } from "react";

const meta = {
  title: "Forms/Dropdown",
  component: Dropdown,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

const Template = () => {
  const [value, setValue] = useState<string>("");
  const onChange = (e: ChangeEvent<HTMLInputElement>) =>
    setValue(e.currentTarget.value);

  const onSelected = (o: DropdownOption) => setValue(o.title);

  return (
    <Dropdown
      placeholder="Select your file"
      onChange={onChange}
      onSelected={onSelected}
      value={value}
      options={[
        {
          title: "File1.pdf",
          Icon: PdfIcon,
          subtitle: "cid1",
        },
        {
          title: "File2.jpg",
          Icon: ImageIcon,
          subtitle: "cid2",
        },
      ]}
    />
  );
};

export const Default: Story = Template.bind({});

export const CustomStyle: Story = {
  args: {
    placeholder: "Select your file",
    options: [],
    style: { "--codex-input-border": "1px solid red" },
    value: "",
    onChange: () => "",
  },
};
