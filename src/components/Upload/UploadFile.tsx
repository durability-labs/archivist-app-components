import { useRef, useReducer, Reducer, useEffect, useCallback } from "react";
import { attributes } from "../utils/attributes";
import { PrettyBytes } from "../utils/bytes";
import { UploadStatus } from "./types";
import { Spinner } from "../Spinner/Spinner";
import { CodexData } from "@codex-storage/sdk-js";
import { ButtonIcon } from "../ButtonIcon/ButtonIcon";
import "./UploadFile.css";
import { WebFileIcon } from "../WebFileIcon/WebFileIcon";
import SuccessCircleIcon from "../../assets/icons/success-circle.svg?react";
import WarningCircleIcon from "../../assets/icons/warning-circle.svg?react";
import CloseIcon from "../../assets/icons/close.svg?react";
import StopIcon from "../../assets/icons/stop.svg?react";

type UploadFileProps = {
  file: File;
  onClose: (id: string) => void;
  id: string;
  onSuccess: ((cid: string, file: File) => void) | undefined;
  codexData: CodexData;
  successMessage: string;
  // useWorker: boolean;
};

type State = {
  progress: { loaded: number; total: number };
  cid: string;
  preview: string;
  status: UploadStatus;
  error: string;
};

type Action =
  | {
      type: "reset";
    }
  | {
      type: "progress";
      loaded: number;
      total: number;
    }
  | {
      type: "preview";
      preview: string;
    }
  | {
      type: "completed";
      cid: string;
    }
  | {
      type: "cancel";
    }
  | {
      type: "delete";
    }
  | {
      type: "error";
      error: string;
    };

const getFileInfo = function (filename: string) {
  if (filename.includes(".")) {
    const parts = filename.split(".");
    const extension = parts.pop();
    const name = parts.join(".");
    return { filename: name, extension };
  }

  return { filename, extension: "" };
};

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "progress": {
      const { loaded, total } = action;
      return {
        ...state,
        progress: { loaded, total },
        status: loaded === total ? "done" : state.status,
      };
    }

    case "preview": {
      return {
        ...state,
        preview: action.preview,
      };
    }

    case "completed": {
      return {
        ...state,

        // Just to ensure the file upload is in done status,
        // in case of the onprogress callback function was not called
        status: "done" as UploadStatus,

        cid: action.cid,
      };
    }

    case "cancel": {
      return {
        ...state,
        status: "error" as UploadStatus,
        error: "The upload has been cancelled.",
      };
    }

    case "delete": {
      return {
        progress: { loaded: 0, total: 0 },
        cid: "",
        preview: "",
        status: "progress" as UploadStatus,
        error: "",
      };
    }

    case "error": {
      return { ...state, error: action.error, status: "error" as UploadStatus };
    }

    default: {
      return state;
    }
  }
}

const isImage = (type: string) => type.startsWith("image");

export function UploadFile({
  file,
  onClose,
  id,
  onSuccess,
  codexData,
  successMessage,
  // useWorker,
}: UploadFileProps) {
  const abort = useRef<(() => void) | null>(null);
  // const worker = useRef<Worker | null>(null);
  const [state, dispatch] = useReducer<Reducer<State, Action>>(reducer, {
    progress: { loaded: 0, total: 0 },
    cid: "",
    preview: "",
    status: "progress" as UploadStatus,
    error: "",
  });

  const upload = useCallback(async () => {
    const { abort: a, result } = codexData.upload(file, onProgress, {
      filename: file.name,
      mimetype: file.type,
    });

    abort.current = a;

    const res = await result;

    if (res.error) {
      dispatch({ type: "error", error: res.data.message });

      return;
    }

    dispatch({ type: "completed", cid: res.data });

    onSuccess?.(res.data, file);
  }, [codexData, onSuccess, file]);

  const init = useRef(false);

  const onProgress = (loaded: number, total: number) => {
    dispatch({
      type: "progress",
      loaded,
      total,
    });
  };

  useEffect(() => {
    if (init.current) {
      return;
    }

    init.current = true;

    if (isImage(file.type)) {
      const reader = new FileReader();

      reader.onload = () => {
        const preview = reader.result?.toString();
        if (preview) {
          dispatch({ type: "preview", preview });
        }
      };

      reader.readAsDataURL(file);
    }

    upload();

    // if (useWorker) {
    //   worker.current = new Worker(new URL("./worker", import.meta.url), {
    //     type: "module",
    //   });

    //   provider().then(() => {
    //     worker.current?.postMessage({ type: "init", upload: "" });
    //   });

    //   worker.current.onmessage = function (e) {
    //     const data = e.data;

    //     if (e.data.type === "progress") {
    //       onProgress(data.loaded, data.total);
    //     } else if (e.data.type === "completed") {
    //       onInternalSuccess(e.data.value.data);
    //     } else if (e.data.error) {
    //       // TODO report with sentry
    //       dispatch({ type: "error", error: e.data.error });
    //     }
    //   };

    //   worker.current.onerror = function (e) {
    //     // TODO report to sentry
    //     console.error("Error in worker:", e);
    //     dispatch({ type: "error", error: e.message });
    //     worker.current?.terminate();
    //   };

    //   worker.current.postMessage({ type: "file", file });
    // } else {
    //   mutateAsync(file);
    // }
  }, [file, upload, codexData]);

  const onCancel = () => {
    // if (worker.current) {
    //   worker.current.postMessage({ type: "abort" });
    // } else {
    //   abort.current?.();
    // }
    abort.current?.();

    const type = state.status === "progress" ? "cancel" : "delete";
    dispatch({ type });
  };

  const onInternalClose = () => {
    // if (worker.current) {
    //   worker.current.postMessage({ type: "abort" });
    // } else {
    //   abort.current?.();
    // }

    abort.current?.();

    onClose(id);
  };

  const { filename, extension } = getFileInfo(file.name);
  const { cid, error = "", preview, progress, status } = state;
  const onAction = state.status === "progress" ? onCancel : onInternalClose;
  const percent =
    progress.total > 0 ? (progress.loaded / progress.total) * 100 : 0;

  const ActionIcon = () => <UploadActionIcon status={status} />;

  return (
    <div
      className="upload-file"
      {...attributes({
        "aria-invalid": status === "error",
        "data-done": status === "done",
      })}
    >
      <div>
        <header>
          <div>
            {preview ? (
              <img src={preview} width="24" alt="Preview" />
            ) : (
              <WebFileIcon type={file.type} />
            )}
            <div className="preview">
              <b>
                <span>{filename}</span>
                {extension && <span>.{extension}</span>}
              </b>
              <div>
                <small>{PrettyBytes(file.size)}</small>
              </div>
            </div>
          </div>
          <div>
            <UploadStatusIcon status={status} />

            <ButtonIcon
              variant="small"
              onClick={onAction}
              Icon={ActionIcon}
            ></ButtonIcon>
          </div>
        </header>

        <main>
          <progress
            {...attributes({
              max: file ? progress.total.toString() : false,
              value: file ? progress.loaded.toString() : false,
            })}
          />
          <span>{percent.toFixed(2)} %</span>
        </main>

        <footer>
          {cid ? (
            <span>{successMessage}</span>
          ) : (
            <span> {error ? error : <>&nbsp;</>}</span>
          )}
        </footer>
      </div>
    </div>
  );
}

type UploadStatusIconProps = {
  status: UploadStatus;
};

export function UploadStatusIcon({ status }: UploadStatusIconProps) {
  switch (status) {
    case "done":
      return (
        <SuccessCircleIcon width={17.5} fill="currentColor"></SuccessCircleIcon>
      );
    case "error":
      return (
        <WarningCircleIcon
          width={17.5}
          fill="currentColor"
          stroke="currentColor"
        ></WarningCircleIcon>
      );

    case "progress":
      return <Spinner width={"1.25rem"} />;
  }
}

function UploadActionIcon({ status }: UploadStatusIconProps) {
  switch (status) {
    case "error":
    case "done":
      return <CloseIcon width={17.5} height={17.5} />;
    case "progress":
      return <StopIcon />;
  }
}
