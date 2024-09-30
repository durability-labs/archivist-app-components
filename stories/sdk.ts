import { CodexData, CodexError, UploadResponse } from "@codex-storage/sdk-js";

class CodexDataMock extends CodexData {
  override upload(
    _: File,
    onProgress?: (loaded: number, total: number) => void
  ): UploadResponse {
    let timeout: number;

    return {
      abort: () => {
        window.clearInterval(timeout);
      },
      result: new Promise((resolve) => {
        let count = 0;
        timeout = window.setInterval(() => {
          count++;

          onProgress?.(500 * count, 1500);

          if (count === 3) {
            window.clearInterval(timeout);

            resolve({
              error: false,
              data: Date.now().toString(),
            });
          }
        }, 1500);
      }),
    };
  }
}

export const CodexDataSdk = new CodexDataMock("");

class CodexDataSlowMock extends CodexData {
  override upload(
    _: File,
    onProgress?: (loaded: number, total: number) => void
  ): UploadResponse {
    let timeout: number;

    return {
      abort: () => {
        window.clearInterval(timeout);
      },
      result: new Promise((resolve) => {
        let count = 0;
        timeout = window.setInterval(() => {
          count++;

          onProgress?.(500 * count, 1500);

          if (count === 3) {
            window.clearInterval(timeout);

            resolve({
              error: false,
              data: Date.now().toString(),
            });
          }
        }, 1500);
      }),
    }
  }
}

export const CodexDataSlowSdk = new CodexDataSlowMock("");

class CodexDataErrorMock extends CodexData {
  override upload(
    _: File,
    onProgress?: (loaded: number, total: number) => void
  ): UploadResponse {
    let timeout: number;

    return {
      abort: () => {
        window.clearInterval(timeout);
      },
      result: new Promise((resolve) => {
        let count = 0;
        timeout = window.setInterval(() => {
          count++;

          onProgress?.(500 * count, 1500);

          if (count === 3) {
            window.clearInterval(timeout);

            resolve({
              error: true,
              data: new CodexError("Some error here"),
            });
          }
        }, 1500);
      }),
    }
  }
}

export const CodexDataErrorSdk = new CodexDataErrorMock("");