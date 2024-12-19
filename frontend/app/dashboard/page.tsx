import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Cloud, PlusCircle } from "lucide-react";
import Link from "next/link";
import { fetchConnectedAccounts } from "@/lib/data";
import { auth } from "@clerk/nextjs/server";

export default async function Page() {
  const { getToken } = await auth();
  const authToken = await getToken();
  const connectedAccountsRes = await fetchConnectedAccounts(authToken!);

  if (connectedAccountsRes === null) {
    return <p>Unexpected error occurred</p>;
  }

  if (!connectedAccountsRes.success) {
    return <p>Error while fetching data: {connectedAccountsRes.error.message}</p>;
  }

  const hasConnectedAccounts = connectedAccountsRes.data.length > 0;
  const connectedAccounts = connectedAccountsRes.data;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Scrollable Content */}
      <div className="flex-1 mb-5 overflow-auto">
        <div className="p-6 max-w-6xl mx-auto space-y-6">
          {hasConnectedAccounts ? (
            <>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Connected Accounts</span>
                    <Link href="/dashboard/providers" className="flex items-center gap-2">
                      <PlusCircle className="w-4 h-4" />
                      Connect New Account
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {connectedAccounts.map((account) => (
                    <Link
                      className="border-b"
                      href={`/dashboard/files/${account.id}`}
                      key={account.id}
                    >
                      {account.name} of {account.provider_name}
                    </Link>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Files</CardTitle>
                </CardHeader>
                <CardContent>{/* Existing recent files content */}</CardContent>
              </Card>
            </>
          ) : (
            <>
              <Card className="bg-gradient-to-br from-blue-50 to-white border-blue-100">
                <CardContent className="p-8">
                  <div className="flex flex-col items-center text-center space-y-2">
                    <Cloud className="w-16 h-16 text-blue-500" />
                    <p className="text-gray-600 max-w-xl">
                      Connect your cloud storage accounts to see all your files in one place.
                    </p>
                    <Link
                      href="/dashboard/providers"
                      className="flex items-center border-2 border-cyan-600 hover:bg-slate-300 px-4 py-2 rounded-3xl"
                    >
                      <PlusCircle className="mr-2 w-5 h-5" />
                      Connect Your First Account
                    </Link>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Start Guide</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
                        1
                      </div>
                      <div>
                        <h3 className="font-medium text-lg mb-2">Choose Your Cloud Storage</h3>
                        <p className="text-gray-600 mb-3">
                          Select from our supported cloud storage providers to get started.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
                        2
                      </div>
                      <div>
                        <h3 className="font-medium text-lg mb-2">Authorize Access</h3>
                        <p className="text-gray-600">
                          Securely connect your account. We only request read access to your files
                          and basic account information.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
                        3
                      </div>
                      <div>
                        <h3 className="font-medium text-lg mb-2">Start Managing Your Files</h3>
                        <p className="text-gray-600">Once connected, you&#39;ll be able to:</p>
                        <ul className="mt-2 space-y-2">
                          {[
                            "View files from all your cloud storage in one place",
                            "Search across all your connected accounts",
                            "Manage storage space efficiently",
                            "Access recent files quickly",
                          ].map((feature, index) => (
                            <li key={index} className="flex items-center gap-2 text-gray-600">
                              <ArrowRight className="w-4 h-4 text-blue-500" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
