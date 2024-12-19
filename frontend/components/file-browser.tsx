"use client";

import { FileIcon, FolderIcon } from "lucide-react";
import { FileData } from "@/lib/types";
import Link from "next/link";

export default function FileBrowser({
  files,
  accountId,
}: {
  files: FileData[];
  accountId: number;
}) {
  const driveFiles = files.filter((item) => item.mimeType !== "application/vnd.google-apps.folder");
  const driveFolders = files.filter(
    (item) => item.mimeType === "application/vnd.google-apps.folder"
  );

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col gap-4">
        <div className="folder-section">
          <span className="text-xl font-extralight">Folders</span>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 mt-4 gap-4">
            {driveFolders.map((folder) => (
              <Link
                href={`/dashboard/folders/${accountId}/${folder.id}`}
                key={folder.id}
                className="flex items-center border-2 border-cyan-600 hover:bg-slate-300 px-4 py-2 rounded-3xl"
              >
                <FolderIcon className="mr-2 h-5 w-5" />
                {folder.name}
              </Link>
            ))}
          </div>
        </div>
        <div className="files-section">
          <span className="text-xl font-extralight">Files</span>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 mt-4 gap-4">
            {driveFiles.map((file) => (
              // <Link
              //   href={file.webViewLink!}
              //   key={file.id}
              //   className="flex items-center border-2 border-cyan-600 hover:bg-slate-300 px-4 py-2 rounded-3xl"
              //   target="_blank"
              // >
              //   <FileIcon className="mr-2 h-6 w-6" />
              //   {file.name}
              // </Link>
              <Link
                key={file.id}
                href={`/dashboard/files/${accountId}/${file.id}`}
                className="flex items-center border-2 border-cyan-600 hover:bg-slate-300 px-4 py-2 rounded-3xl hover:underline"
              >
                <FileIcon className="mr-2 h-6 w-6" />
                {file.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
      {/*<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">*/}
      {/*  {files.map((file) => (*/}
      {/*    <Card className="border-2 border-blue-300 bg-slate-50" key={file.id}>*/}
      {/*      <CardHeader>*/}
      {/*        <CardTitle className="flex items-center">*/}
      {/*          {file.mimeType === "application/vnd.google-apps.folder" ? (*/}
      {/*            <FolderIcon className="mr-2 h-6 w-6 text-blue-500" />*/}
      {/*          ) : (*/}
      {/*            <FileIcon className="mr-2 h-6 w-6 text-gray-500" />*/}
      {/*          )}*/}
      {/*          {file.name}*/}
      {/*        </CardTitle>*/}
      {/*      </CardHeader>*/}
      {/*      <CardFooter>*/}
      {/*        {file.mimeType === "application/vnd.google-apps.folder" ? (*/}
      {/*          <Button onClick={() => onFolderClick(file)} className="w-full" variant="outline">Open Folder</Button>*/}
      {/*        ) : (*/}
      {/*          <Button*/}
      {/*          asChild*/}
      {/*          className="w-full"*/}
      {/*          variant="outline"*/}
      {/*        >*/}
      {/*          <Link href={`/dashboard/files/${accountId}/${file.id}`}>Open File</Link>*/}
      {/*        </Button>*/}
      {/*        )}*/}
      {/*      </CardFooter>*/}
      {/*    </Card>*/}
      {/*  ))}*/}
      {/*</div>*/}
    </div>
  );
}
