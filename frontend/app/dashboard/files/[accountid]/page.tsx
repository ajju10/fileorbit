import { fetchFiles } from "@/lib/data";
import { auth } from "@clerk/nextjs/server";

export default async function Page({ params }: { params: Promise<{ accountid: number }> }) {
  const accountId = (await params).accountid;
  const { getToken } = await auth();
  const authToken = await getToken();
  const data = await fetchFiles(authToken!, accountId);
  console.log("Data:\n", data);
  return <span>This is files page, account id: {accountId}</span>;
}
