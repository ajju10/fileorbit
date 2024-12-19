import { fetchFiles } from "@/lib/data";
import { auth } from "@clerk/nextjs/server";
import FileBrowser from "@/components/file-browser";
import { FileData } from "@/lib/types";

export default async function Page({ params }: { params: Promise<{ accountid: number }> }) {
  const accountId = (await params).accountid;
  const { getToken } = await auth();
  const authToken = await getToken();
  const fileResponse = await fetchFiles(authToken!, accountId);
  const data: FileData[] = fileResponse.data;
  return <FileBrowser files={data} accountId={accountId} />;
}
