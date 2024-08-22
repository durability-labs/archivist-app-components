import { FileStack, Upload as UploadIcon } from "lucide-react";
import { ChangeEvent, CSSProperties, DragEventHandler, useRef } from "react";
import { attributes } from "../utils/attributes.ts";
import "./upload.css";
import { UploadFile } from "./UploadFile.tsx";
import { useUploadStategy } from "./useUploadStrategy.ts";
import { classnames } from "../utils/classnames.ts";
import { ButtonIcon } from "../ButtonIcon/ButtonIcon.tsx";
import { CodexData, UploadResponse } from "@codex/sdk-js";
import { SimpleText } from "../SimpleText/SimpleText.tsx";

interface CustomStyleCSS extends CSSProperties {
  "--codex-border-color"?: string;
  "--codex-border-radius"?: string;
  "--codex-upload-background"?: string;
  "--codex-color-primary"?: string;
  "--codex-color"?: string;
  "--codex-color-error"?: string;
  "--codex-color-warning"?: string;
}

type Props = {
  /**
   * Allow multiple files.
   * Default is true.
   */
  multiple?: boolean;

  /**
   * Event triggered when a file is uploaded.
   * The cid is the unique identifier of the file in Codex network.
   */
  onSuccess?: (cid: string) => void;

  /*
   * Event triggered when the user selected files to upload.
   */
  onFileChange?: (e: ChangeEvent<HTMLInputElement>) => void;

  /**
   * Event triggered when a file is deleted.
   * The id is generated after the file are selected by the user.
   */
  onDeleteItem?: (id: string) => void;

  onClick?: (() => void) | undefined;

  onMouseEnter?: () => void;

  onMouseLeave?: () => void;

  /**
   * Allow to override the previous file(s).
   * If false, the user cannot upload a new file(s) until he deletes the previous file(s).
   */
  editable?: boolean;

  /**
   * Codex provider to upload the data.
   * If not provider is passed, the cid returned will be empty.
   * Default value: provider returning random cid.
   */
  provider?: () => Promise<CodexData["upload"]>;

  /**
   * If true, the upload will run in a separate web worker.
   * Default is !!window.Worker.
   */
  useWorker?: boolean;

  /**
   * Apply custom css variables.
   * --codex-border-color
   * --codex-border-radius
   * --codex-upload-background
   * --codex-color-primary
   * --codex-color
   * --codex-color-error
   *  --codex-color-warning
   */
  style?: CustomStyleCSS;
};

const defaultProvider = () =>
  Promise.resolve(
    (_: File, onProgress: (loaded: number, total: number) => void) => {
      onProgress(100, 100);

      return Promise.resolve({
        abort: () => {},
        result: Promise.resolve({
          error: false as false,
          data: Date.now().toString(),
        }),
      } satisfies UploadResponse);
    }
  );

export function Upload({
  onMouseEnter,
  onMouseLeave,
  onClick,
  onFileChange,
  multiple = true,
  editable = true,
  onDeleteItem,
  onSuccess,
  provider = defaultProvider,
  useWorker = !!window.Worker,
}: Props) {
  const { deleteFile, files, uploadFiles, warning } = useUploadStategy(
    multiple ? "multiple" : "single",
    editable
  );
  const input = useRef<HTMLInputElement>(null);

  const onDragPrevents: DragEventHandler = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const onDrop: DragEventHandler = (e) => {
    onDragPrevents(e);
    uploadFiles(e.dataTransfer.files);
  };

  const onInternalFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      uploadFiles(e.target.files);
    }

    if (input.current) {
      input.current.value = "";
    }

    onFileChange?.(e);
  };

  const onClose = (id: string) => {
    deleteFile(id);
    onDeleteItem?.(id);
  };

  const onInternalClick = () => {
    onClick?.();
    input.current?.click();
  };

  return (
    <>
      <div
        className={classnames(["upload"], ["upload-warning", !!warning])}
        tabIndex={1}
        onClick={onInternalClick}
        onDragOver={onDragPrevents}
        onDragEnter={onDragPrevents}
        onDrop={onDrop}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <ButtonIcon Icon={multiple ? FileStack : UploadIcon}></ButtonIcon>
        <div className="upload-text">
          <div>
            <b>
              Drop your {multiple ? "file(s)" : "file"} here or{" "}
              <span className="text--primary">browse</span>
            </b>
          </div>
          <SimpleText size="small" variant="light" center>
            {multiple ? "Up to 10 files" : "Choose one single file"}
          </SimpleText>
        </div>
        <input
          type="file"
          hidden
          ref={input}
          onChange={onInternalFileChange}
          {...attributes({ multiple: multiple })}
        />

        {warning && <SimpleText variant="warning">{warning}</SimpleText>}
      </div>

      {files.map(({ id, file }) => (
        <UploadFile
          file={file}
          key={id}
          onClose={() => onClose(id)}
          id={id}
          onSuccess={onSuccess}
          provider={provider}
          useWorker={useWorker}
        />
      ))}
    </>
  );
}
