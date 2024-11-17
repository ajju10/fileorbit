import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FileIcon, FolderIcon, DownloadIcon, Cloud } from "lucide-react";

// Mock data for connected accounts and files
const connectedAccounts = [
  { id: "1", name: "Google Drive", icon: Cloud },
  { id: "2", name: "Dropbox", icon: Cloud },
  { id: "3", name: "OneDrive", icon: Cloud },
];

const mockFiles = [
  { id: "1", name: "Document.pdf", type: "file", size: "2.5 MB" },
  { id: "2", name: "Images", type: "folder", itemCount: 15 },
  { id: "3", name: "Presentation.pptx", type: "file", size: "5.1 MB" },
  { id: "4", name: "Spreadsheet.xlsx", type: "file", size: "1.8 MB" },
  { id: "5", name: "Projects", type: "folder", itemCount: 8 },
  { id: "6", name: "Report.docx", type: "file", size: "3.2 MB" },
];

export default function FileBrowser() {
  const [selectedAccount, setSelectedAccount] = useState(connectedAccounts[0].id);

  const handleAccountChange = (accountId: string) => {
    setSelectedAccount(accountId);
    // In a real application, you would fetch files for the selected account here
  };

  const handleFileAction = (file: (typeof mockFiles)[0]) => {
    if (file.type === "file") {
      console.log(`Downloading file: ${file.name}`);
      // Implement file download logic here
    } else {
      console.log(`Opening folder: ${file.name}`);
      // Implement folder navigation logic here
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">File Viewer</h1>
        <Select value={selectedAccount} onValueChange={handleAccountChange}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select account" />
          </SelectTrigger>
          <SelectContent>
            {connectedAccounts.map((account) => (
              <SelectItem key={account.id} value={account.id}>
                <div className="flex items-center">
                  <account.icon className="mr-2 h-4 w-4" />
                  {account.name}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockFiles.map((file) => (
          <Card key={file.id}>
            <CardHeader>
              <CardTitle className="flex items-center">
                {file.type === "folder" ? (
                  <FolderIcon className="mr-2 h-6 w-6 text-blue-500" />
                ) : (
                  <FileIcon className="mr-2 h-6 w-6 text-gray-500" />
                )}
                {file.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">
                {file.type === "folder" ? `${file.itemCount} items` : `Size: ${file.size}`}
              </p>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={() => handleFileAction(file)} variant="outline">
                {file.type === "folder" ? "Open" : "Download"}
                {file.type === "folder" ? (
                  <FolderIcon className="ml-2 h-4 w-4" />
                ) : (
                  <DownloadIcon className="ml-2 h-4 w-4" />
                )}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
