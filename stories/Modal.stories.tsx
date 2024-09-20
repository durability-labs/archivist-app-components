import type { Meta } from "@storybook/react";
import { useState } from "react";
import { Modal } from "../src/components/Modal/Modal";
import { fn } from "@storybook/test";

const meta = {
  title: "Overlays/Modal",
  component: Modal,
  parameters: {
    layout: "fullscreen",
    inlineStories: false,
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {
    onAction: fn(),
    onClose: fn(),
  },
} satisfies Meta<typeof Modal>;

export default meta;

type Props = {
  onAction: () => void;
  onClose: () => void;
};

const Template = (props: Props) => {
  const [open, setOpen] = useState(false);

  const onOpen = () => setOpen(true);

  const onClose = () => {
    props.onClose();
    setOpen(false);
  };

  return (
    <div style={{ padding: "6rem" }}>
      <button onClick={onOpen}>Make Modal</button>
      <Modal onClose={onClose} open={open}>
        <p>Hello world</p>
      </Modal>
    </div>
  );
};

export const Default = Template.bind({});

const ActionTemplate = (props: Props) => {
  const [open, setOpen] = useState(false);

  const onOpen = () => setOpen(true);

  const onClose = () => {
    props.onClose();
    setOpen(false);
  };

  const onAction = () => {
    props.onAction();
    setOpen(false);
  };

  return (
    <div style={{ padding: "6rem" }}>
      <button onClick={onOpen}>Make Modal</button>
      <Modal onClose={onClose} open={open} onAction={onAction}>
        <p>Hello world</p>
      </Modal>
    </div>
  );
};

export const Action = ActionTemplate.bind({});

const NoButtonTemplate = (props: Props) => {
  const [open, setOpen] = useState(false);

  const onOpen = () => setOpen(true);

  const onClose = () => {
    props.onClose();
    setOpen(false);
  };

  return (
    <div style={{ padding: "6rem" }}>
      <button onClick={onOpen}>Make Modal</button>
      <Modal onClose={onClose} open={open} displayCloseButton={false}>
        <p>Hello world</p>
      </Modal>
    </div>
  );
};

export const NoButton = NoButtonTemplate.bind({});
