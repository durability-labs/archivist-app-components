import type { Meta, StoryObj } from "@storybook/react";
import { Upload } from "../components/Upload/Upload";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UploadResponse } from "@codex/sdk-js";

const meta = {
  title: "Advanced/Upload",
  component: Upload,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Upload>;

export default meta;
type Story = StoryObj<typeof meta>;

const queryClient = new QueryClient();

const Template = () => {
  return (
    <QueryClientProvider client={queryClient}>
      {<Upload useWorker={false} multiple />}
    </QueryClientProvider>
  );
};

export const Multiple: Story = Template.bind({});

const slowProvider = () =>
  Promise.resolve(
    (_: File, onProgress: (loaded: number, total: number) => void) => {
      return new Promise<UploadResponse>((resolve) => {
        let timeout;

        resolve({
          abort: () => {
            window.clearInterval(timeout);
          },
          result: new Promise((resolve) => {
            let count = 0;
            timeout = setInterval(() => {
              count++;

              onProgress(500 * count, 1500);

              if (count === 3) {
                window.clearInterval(timeout);

                resolve({
                  error: false as false,
                  data: Date.now().toString(),
                });
              }
            }, 1500);
          }),
        });
      });
    }
  );

const SlowTemplate = () => {
  return (
    <div className="demo">
      <QueryClientProvider client={queryClient}>
        {<Upload useWorker={false} multiple provider={slowProvider} />}
      </QueryClientProvider>
    </div>
  );
};

export const Slow: Story = SlowTemplate.bind({});

const SingleTemplate = () => {
  return (
    <div className="demo">
      <QueryClientProvider client={queryClient}>
        {
          <Upload
            useWorker={false}
            multiple={false}
            editable={false}
            provider={slowProvider}
          />
        }
      </QueryClientProvider>
    </div>
  );
};

export const Single: Story = SingleTemplate.bind({});
