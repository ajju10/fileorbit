import { fetchFileData } from "@/lib/data";
import { auth } from "@clerk/nextjs/server";
import FilePreview from "@/components/file-preview";

export default async function Page({
  params,
}: {
  params: Promise<{ accountid: number; fileid: string }>;
}) {
  const accountId = (await params).accountid;
  const fileId = (await params).fileid;
  const { getToken } = await auth();
  const authToken = await getToken();
  const result = await fetchFileData(authToken!, accountId, fileId);

  return (
    // <Image
    //   src={`data:image/jpeg;base64,${result.data}`}
    //   alt="Dynamic Rendered Image"
    //   height={500}
    //   width={500}
    // />
    <FilePreview rawFile={result.data} />
  );
}
