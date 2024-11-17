export async function fetchConnectedAccounts(authToken: string) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  try {
    const res = await fetch(API_URL + "/connected-account", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });
    return await res.json();
  } catch (e) {
    console.log("Error while fetching accounts:", e);
    return null;
  }
}

export async function fetchFiles(authToken: string, accountId: number) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const url = `${API_URL}/files/${accountId}`;
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });
    return await res.json();
  } catch (e) {
    console.log("Error while fetching files:", e);
    return null;
  }
}
