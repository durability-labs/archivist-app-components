import { Archivist } from "@durability-labs/archivist-sdk-js";

const archivist = new Archivist(import.meta.env.VITE_ARCHIVIST_API_URL);
let abort: () => void;

self.addEventListener("message", function (e) {
  const { type, ...rest } = e.data;

  if (type === "abort") {
    console.debug("Aborting request");

    abort?.();

    return;
  }

  const onProgress = (loaded: number, total: number) => {
    self.postMessage({
      type: "progress",
      loaded,
      total,
    });
  };

  const res = archivist.data.upload(rest.file, onProgress);

  abort = res.abort;

  return res.result.then((value) => {
    self.postMessage({
      type: "completed",
      value,
    });
  });
});
