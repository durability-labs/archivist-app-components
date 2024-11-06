import AudioIcon from "../../assets/icons/audio-file.svg?react";
import VideoIcon from "../../assets/icons/video-file.svg?react";
import ImageIcon from "../../assets/icons/image-file.svg?react";
import PdfIcon from "../../assets/icons/pdf-file.svg?react";
import ExcelIcon from "../../assets/icons/excel-file.svg?react";
import DocIcon from "../../assets/icons/doc-file.svg?react";
import AnyFileIcon from "../../assets/icons/any-file.svg?react";

type Props = {
  type: string;
  size?: number;
};

export function WebFileIcon({ type, size = 24 }: Props) {
  if (type.startsWith("audio")) {
    return <AudioIcon width={size} />;
  }

  if (type.startsWith("image")) {
    return <ImageIcon width={size} />;
  }

  if (type.startsWith("video")) {
    return <VideoIcon width={size} />;
  }

  switch (type) {
    case "application/pdf": {
      return <PdfIcon width={size} />;
    }

    case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
    case "application/vnd.ms-excel": {
      return <ExcelIcon width={size} />;
    }

    case "application/msdoc": {
      return <DocIcon width={size} />;
    }

    default: {
      return <AnyFileIcon width={size} />;
    }
  }
}
