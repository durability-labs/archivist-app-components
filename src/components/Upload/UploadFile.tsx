import {
  useRef,
  useState,
  useReducer,
  Reducer,
  useEffect,
  useCallback,
} from "react";
import { attributes } from "../utils/attributes";
import { PrettyBytes } from "../utils/bytes";
import { Toast } from "../Toast/Toast";
import { UploadStatus } from "./types";
import { CircleCheck, TriangleAlert, CircleX, CircleStop } from "lucide-react";
import { Spinner } from "../Spinner/Spinner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CodexData } from "@codex-storage/sdk-js";
import { WebFileIcon } from "../WebFileIcon/WebFileIcon";
import { ButtonIcon } from "../ButtonIcon/ButtonIcon";
import { SimpleText } from "../SimpleText/SimpleText";

type UploadFileProps = {
  file: File;
  onClose: (id: string) => void;
  id: string;
  onSuccess: ((cid: string, file: File) => void) | undefined;
  codexData: CodexData;
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
      type: "error";
      error: string;
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
        status: "done" as UploadStatus,
        cid: action.cid,
      };
    }

    case "cancel": {
      if (state.status === "progress") {
        return {
          ...state,
          status: "error" as UploadStatus,
          error: "The upload has been cancelled.",
        };
      }

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
  // useWorker,
}: UploadFileProps) {
  const abort = useRef<(() => void) | null>(null);
  const queryClient = useQueryClient();
  const worker = useRef<Worker | null>(null);
  const [toast, setToast] = useState({ time: 0, message: "" });
  const [state, dispatch] = useReducer<Reducer<State, Action>>(reducer, {
    progress: { loaded: 0, total: 0 },
    cid: "",
    preview: "",
    status: "progress" as UploadStatus,
    error: "",
  });
  const { mutateAsync } = useMutation({
    mutationKey: ["upload"],
    mutationFn: (file: File) => {
      return codexData
        .upload(file, onProgress)
        .then((res) => {
          abort.current = res.abort;
          return res.result;
        })
        .then((safe) =>
          safe.error
            ? Promise.reject(safe.data.message)
            : Promise.resolve(safe.data)
        );
    },
    onError: (error) => {
      // worker.current?.terminate();
      dispatch({ type: "error", error: error.message });
    },
    onSuccess: (cid: string) => {
      onInternalSuccess(cid);
    },
  });
  const init = useRef(false);

  const onInternalSuccess = useCallback(
    (cid: string) => {
      worker.current?.terminate();

      queryClient.invalidateQueries({
        queryKey: ["cids"],
      });

      if (onSuccess) {
        onSuccess(cid, file);
        dispatch({ type: "reset" });
      } else {
        dispatch({ type: "completed", cid });
      }
    },
    [onSuccess, dispatch, queryClient, file]
  );

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

    mutateAsync(file);

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
  }, [file, mutateAsync, onInternalSuccess, codexData]);

  const onCancel = () => {
    if (worker.current) {
      worker.current.postMessage({ type: "abort" });
    } else {
      abort.current?.();
    }

    dispatch({ type: "cancel" });
  };

  const onInternalClose = () => {
    if (worker.current) {
      worker.current.postMessage({ type: "abort" });
    } else {
      abort.current?.();
    }

    onClose(id);
  };

  const onCopy = () => {
    if (cid) {
      navigator.clipboard.writeText(cid);
      setToast({
        time: Date.now(),
        message: "The CID has been copied to your clipboard.",
      });
    }
  };

  const parts = file.name.split(".");
  const extension = parts.pop();
  const filename = parts.join(".");
  const { cid, error, preview, progress, status } = state;
  const onAction = state.status === "progress" ? onCancel : onInternalClose;
  const percent =
    progress.total > 0 ? (progress.loaded / progress.total) * 100 : 0;

  const ActionIcon = () => <UploadActionIcon status={status} />;

  return (
    <div className={"uploadFile"}>
      <div className="uploadFile-info">
        <div className="uploadFile-infoLeft">
          {preview ? (
            <img
              src={preview}
              width="24"
              alt="Preview"
              className="uploadFile-preview"
            />
          ) : (
            <WebFileIcon type={file.type} />
          )}
          <div className="uploadFile-infoText">
            <b
              className="uploadFile-name"
              {...attributes({
                "aria-invalid": status === "error",
                "data-done": status === "done",
              })}
            >
              <span className="uploadFile-filename">{filename}</span>
              <span>.{extension}</span>
            </b>
            <div>
              <small>{PrettyBytes(file.size)}</small>
            </div>
          </div>
        </div>
        <div className="uploadFile-infoRight">
          <UploadStatusIcon status={status} />

          <ButtonIcon
            variant="small"
            onClick={onAction}
            Icon={ActionIcon}
          ></ButtonIcon>
        </div>
      </div>

      <div className="uploadFile-progress">
        <progress
          className="uploadFile-progressBar"
          {...attributes({
            max: file ? progress.total.toString() : false,
            value: file ? progress.loaded.toString() : false,
            "aria-invalid": status === "error",
          })}
        />
        <span className="uploadFile-progressBarPercent">
          {percent.toFixed(2)} %
        </span>
      </div>

      {!!cid && (
        <>
          <div className="text--primary">
            <span>Success !</span> Click on the CID to copy it to your
            clipboard.
          </div>
          <a>
            <small className="uploadFile-cid" onClick={onCopy}>
              {cid}
            </small>
          </a>
        </>
      )}

      {error && <SimpleText variant="error">{error}</SimpleText>}

      <Toast message={toast.message} time={toast.time} variant="success" />
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
        <CircleCheck
          size={"1.25rem"}
          fill="currentColor"
          className="upload-progress-check"
          stroke="var(--codex-background)"
        ></CircleCheck>
      );
    case "error":
      return (
        <TriangleAlert
          size={"1.25rem"}
          fill="currentColor"
          className="upload-progress-cancelled"
          stroke="var(--codex-background)"
        ></TriangleAlert>
      );

    case "progress":
      return <Spinner width={"1.25rem"} className="upload-progress-check" />;
  }
}

function UploadActionIcon({ status }: UploadStatusIconProps) {
  switch (status) {
    case "error":
    case "done":
      return <CircleX size={"1.25rem"} />;
    case "progress":
      return <CircleStop size={"1.25rem"} />;
  }
}
