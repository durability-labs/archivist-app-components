import { useState } from "react";

const MAX_FILES_ALLOWED = 10;

type CodexFile = { file: File; id: string };

export function useUploadStategy(
  stategy: "multiple" | "single",
  editable = true
) {
  const [files, setFiles] = useState<CodexFile[]>([]);
  const [warning, setWarning] = useState("");

  const uploadFiles = (incoming: File[] | FileList) => {
    setWarning("");

    if (incoming.length === 0) {
      return;
    }

    if (!editable && files.length) {
      setWarning(
        "You already uploaded a file, please delete the current file before uploading a new one."
      );
      return;
    }

    if (stategy === "single" && incoming.length > 1) {
      setWarning(
        "You tried to upload multiple files but this upload accept only one file, the first file will be used and the rest will be ignored."
      );
    }

    const ingest = stategy === "multiple" ? incoming : [incoming[0]];

    const f: CodexFile[] = [];
    const length = Math.min(ingest.length, MAX_FILES_ALLOWED);

    for (let i = 0; i < length; i++) {
      const id = Date.now() + "-" + i;
      f.push({ file: ingest[i], id });
    }

    setFiles((files) => [...f, ...files]);

    return { error: false, data: null };
  };

  const deleteFile = (id: string) => {
    setWarning("");
    setFiles((files) => files.filter((f) => f.id !== id));
  };

  return { uploadFiles, deleteFile, files, warning };
}
