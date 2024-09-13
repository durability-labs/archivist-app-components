import type { Meta } from "@storybook/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Upload } from "../src/components/Upload/Upload";
import { fn } from "@storybook/test";
import "./Upload.stories.css";
import { CodexDataSdk, CodexDataSlowSdk } from "./sdk";

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

const queryClient = new QueryClient();

type Props = {
  onClick?: () => void;

  onMouseEnter?: () => void;

  onMouseLeave?: () => void;

  onSuccess?: () => void;

  onDeletedItem?: () => void;
};

const Template = (p: Props) => {
  return (
    <QueryClientProvider client={queryClient}>
      {<Upload multiple {...p} codexData={CodexDataSdk} />}
    </QueryClientProvider>
  );
};

export const Multiple = Template.bind({});

const SlowTemplate = (p: Props) => {
  return (
    <div className="demo">
      <QueryClientProvider client={queryClient}>
        {<Upload multiple codexData={CodexDataSlowSdk} {...p} />}
      </QueryClientProvider>
    </div>
  );
};

export const Slow = SlowTemplate.bind({});

const SingleTemplate = (p: Props) => {
  return (
    <div className="demo">
      <QueryClientProvider client={queryClient}>
        {
          <Upload
            multiple={false}
            editable={false}
            codexData={CodexDataSlowSdk}
            {...p}
          />
        }
      </QueryClientProvider>
    </div>
  );
};

export const Single = SingleTemplate.bind({});
