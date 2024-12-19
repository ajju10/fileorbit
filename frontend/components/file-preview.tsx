"use client";

import { DocumentViewer } from "react-documents";

export default function FilePreview({ rawFile }: { rawFile: string }) {
  // const data = Buffer.from(rawFile, "base64").toString("utf-8");
  // const blobData = new Blob([data], { type: "image/jpeg" });
  // const url = URL.createObjectURL(blobData);
  // return <DocumentViewer queryParams="hl=en" url={url}></DocumentViewer>
  return <h1>File Viewer</h1>;
}
