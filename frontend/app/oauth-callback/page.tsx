import { redirect } from "next/navigation";
import { exchangeCodeForToken } from "@/lib/actions";
import { auth } from "@clerk/nextjs/server";

export default async function OAuthCallback({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const code = searchParams.code;
  const state = searchParams.state;
  const { getToken } = await auth();

  if (typeof code !== "string" || typeof state !== "string") {
    redirect("/error?message=Invalid OAuth callback");
  }

  try {
    const { provider, driveName } = JSON.parse(decodeURIComponent(state));
    const authToken = await getToken();
    const exchangeTokenResponse = await exchangeCodeForToken(authToken!, code, provider, driveName);

    // Store the access token securely (e.g., in a HTTP-only cookie)
    // cookies().set('accessToken', accessToken, { httpOnly: true, secure: true });

    // Store provider and drive name in your database here
    // For this example, we'll just store it in a cookie
    // cookies().set('providerInfo', JSON.stringify({ provider, driveName }), { httpOnly: true, secure: true });
  } catch (error) {
    console.error("Error while OAuth callback:", error);
    redirect("/error?message=Failed to complete OAuth flow");
  }

  redirect("/dashboard");
}
