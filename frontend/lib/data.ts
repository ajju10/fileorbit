const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchConnectedAccounts(authToken: string) {
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
    console.error("Error while fetching accounts:", e);
    return null;
  }
}

export async function fetchFiles(authToken: string, accountId: number) {
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
    console.error("Error while fetching files:", e);
    return null;
  }
}

export async function fetchFileData(authToken: string, accountId: number, fileId: string) {
  const url = `${API_URL}/files/${accountId}/${fileId}`;
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });
    console.log("HEADERS:", res.headers);
    return await res.json();
  } catch (e) {
    console.error(`Error fetching file ${fileId} data:`, e);
    return null;
  }
}
