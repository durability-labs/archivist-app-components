import { ChangeEvent, ComponentType, DragEventHandler, useRef } from "react";
import { attributes } from "../utils/attributes.ts";
import "./upload.css";
import { UploadFile } from "./UploadFile.tsx";
import { useUploadStategy } from "./useUploadStrategy.ts";
import { classnames } from "../utils/classnames.ts";
import { CodexData } from "@codex-storage/sdk-js";

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
  onSuccess?: (cid: string, file: File) => void;

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
  codexData: CodexData;

  /**
   * If true, the upload will run in a separate web worker.
   * Default is !!window.Worker.
   */
  // useWorker?: boolean;

  /**
   * Success message displayed when a file is updated.
   * Default: File uploaded successfully.
   */
  successMessage?: string;

  Icon?: ComponentType;
};

export function Upload({
  onMouseEnter,
  onMouseLeave,
  onClick,
  onFileChange,
  Icon,
  multiple = true,
  editable = true,
  onDeleteItem,
  onSuccess,
  codexData,
  successMessage = "File uploaded successfully",
  // useWorker = !!window.Worker,
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
        className={classnames(["upload"], ["upload--warning", !!warning])}
        tabIndex={1}
        onClick={onInternalClick}
        onDragOver={onDragPrevents}
        onDragEnter={onDragPrevents}
        onDrop={onDrop}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <div>
          <b>
            Drop your {multiple ? "file(s)" : "file"} here or{" "}
            <span>browse</span>
          </b>

          <small>
            {" "}
            {multiple ? "Up to 10 files" : "Choose one single file"}
          </small>
        </div>

        {Icon && <Icon></Icon>}

        <input
          data-testid="upload"
          type="file"
          hidden
          ref={input}
          onChange={onInternalFileChange}
          {...attributes({ multiple: multiple })}
        />

        {warning && <span>{warning}</span>}
      </div>

      {files.map(({ id, file }) => (
        <UploadFile
          file={file}
          key={id}
          onClose={() => onClose(id)}
          id={id}
          onSuccess={onSuccess}
          codexData={codexData}
          successMessage={successMessage}
          // useWorker={useWorker}
        />
      ))}
    </>
  );
}
