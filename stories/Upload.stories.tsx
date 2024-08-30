import type { Meta } from "@storybook/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UploadResponse } from "@codex-storage/sdk-js";
import { Upload } from "../src/components/Upload/Upload";
import { fn } from "@storybook/test";
import "./Upload.stories.css";

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
      {<Upload useWorker={false} multiple {...p} />}
    </QueryClientProvider>
  );
};

export const Multiple = Template.bind({});

const slowProvider = () =>
  Promise.resolve(
    (_: File, onProgress: (loaded: number, total: number) => void) => {
      return new Promise<UploadResponse>((resolve) => {
        let timeout: number;

        resolve({
          abort: () => {
            window.clearInterval(timeout);
          },
          result: new Promise((resolve) => {
            let count = 0;
            timeout = window.setInterval(() => {
              count++;

              onProgress(500 * count, 1500);

              if (count === 3) {
                window.clearInterval(timeout);

                resolve({
                  error: false,
                  data: Date.now().toString(),
                });
              }
            }, 1500);
          }),
        });
      });
    }
  );

const SlowTemplate = (p: Props) => {
  return (
    <div className="demo">
      <QueryClientProvider client={queryClient}>
        {<Upload useWorker={false} multiple provider={slowProvider} {...p} />}
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
            useWorker={false}
            multiple={false}
            editable={false}
            provider={slowProvider}
            {...p}
          />
        }
      </QueryClientProvider>
    </div>
  );
};

export const Single = SingleTemplate.bind({});
