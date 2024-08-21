import { AudioIcon } from "./AudioIcon";
import { ImageIcon } from "./ImageIcon";
import { VideoIcon } from "./VideoIcon";
import { PdfIcon } from "./PdfIcon";
import { ExcelIcon } from "./ExcelIcon";
import { DocIcon } from "./DocIcon";
import { AnyFileIcon } from "./AnyFileIcon";

type Props = {
  type: string;
  size?: number;
};

export function WebFileIcon({ type, size = 24 }: Props) {
  if (type.startsWith("audio")) {
    return <AudioIcon size={size} />;
  }

  if (type.startsWith("image")) {
    return <ImageIcon size={size} />;
  }

  if (type.startsWith("video")) {
    return <VideoIcon size={size} />;
  }

  switch (type) {
    case "application/pdf": {
      return <PdfIcon size={size} />;
    }

    case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
    case "application/vnd.ms-excel": {
      return <ExcelIcon size={size} />;
    }

    case "application/msdoc": {
      return <DocIcon size={size} />;
    }

    default: {
      return <AnyFileIcon size={size} />;
    }
  }
}
