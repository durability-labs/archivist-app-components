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

  const Icon = () => (
    <svg
      width="20"
      height="10"
      viewBox="0 0 20 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_326_785)">
        <path
          d="M14.1666 7.91667L9.99992 3.75L5.83325 7.91667H14.1666ZM14.1666 12.0833L9.99992 16.25L5.83325 12.0833H14.1666Z"
          fill="#969696"
        />
      </g>
      <defs>
        <clipPath id="clip0_326_785">
          <rect width="20" height="10" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );

  return (
    <div style={{ padding: "6rem" }}>
      <button onClick={onOpen}>Make Modal</button>
      <Modal title="Title" Icon={Icon} onClose={onClose} open={open}>
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
      <Modal
        onClose={onClose}
        open={open}
        onAction={onAction}
        displayActionButton={true}
      >
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
