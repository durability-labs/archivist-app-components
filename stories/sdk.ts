import { ArchivistData, ArchivistError, UploadResponse } from "@durability-labs/archivist-sdk-js";

class ArchivistDataMock extends ArchivistData {
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

export const ArchivistDataSdk = new ArchivistDataMock("");

class ArchivistDataSlowMock extends ArchivistData {
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

export const ArchivistDataSlowSdk = new ArchivistDataSlowMock("");

class ArchivistDataErrorMock extends ArchivistData {
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
              data: new ArchivistError("Some error here"),
            });
          }
        }, 1500);
      }),
    }
  }
}

export const ArchivistDataErrorSdk = new ArchivistDataErrorMock("");