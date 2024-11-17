import { Provider } from "@/lib/types";

export async function exchangeCodeForToken(
  authToken: string,
  code: string,
  provider: Provider,
  driveName: string
) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const reqData = {
    provider,
    code,
    drive_name: driveName,
  };

  try {
    const response = await fetch(API_URL + "/oauth-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(reqData),
    });

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch (e) {
    console.log("Error", e);
    return null;
  }
}
