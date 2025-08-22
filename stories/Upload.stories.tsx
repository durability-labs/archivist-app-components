import type { Meta } from "@storybook/react";
import { Upload } from "../src/components/Upload/Upload";
import { fn } from "@storybook/test";
import "./Upload.stories.css";
import { ArchivistDataSdk, ArchivistDataSlowSdk, ArchivistDataErrorSdk } from "./sdk";

const meta = {
  title: "Advanced/Upload",
  component: Upload,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {
    onMouseEnter: fn(),
    onMouseLeave: fn(),
    onClick: fn(),
    onSuccess: fn(),
    onDeleteItem: fn(),
    onFileChange: fn(),
  },
} satisfies Meta<typeof Upload>;

export default meta;

type Props = {
  onClick?: () => void;

  onMouseEnter?: () => void;

  onMouseLeave?: () => void;

  onSuccess?: () => void;

  onDeletedItem?: () => void;
};

const Template = (p: Props) => {
  return <Upload multiple {...p} archivistData={ArchivistDataSdk} />;
};

export const Multiple = Template.bind({});

const SlowTemplate = (p: Props) => {
  return (
    <div className="demo">
      <Upload multiple archivistData={ArchivistDataSlowSdk} {...p} />
    </div>
  );
};

export const Slow = SlowTemplate.bind({});

const SingleTemplate = (p: Props) => {
  return (
    <div className="demo">
      {
        <Upload
          multiple={false}
          editable={false}
          archivistData={ArchivistDataSlowSdk}
          {...p}
        />
      }
    </div>
  );
};

export const Single = SingleTemplate.bind({});

const ErrorTemplate = (p: Props) => {
  return (
    <div className="demo">
      {
        <Upload
          multiple={false}
          editable={false}
          archivistData={ArchivistDataErrorSdk}
          {...p}
        />
      }
    </div>
  );
};

export const Error = ErrorTemplate.bind({});
