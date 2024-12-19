export type Provider = {
  id: number;
  name: string;
  endpoint: string;
};

export type FileData = {
  id: string;
  mimeType: string;
  name: string;
  webContentLink?: string;
  webViewLink?: string;
};
