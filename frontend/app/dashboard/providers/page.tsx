"use client";

import { useAuth } from "@clerk/nextjs";
import useSWR from "swr";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Provider } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CloudIcon, PlusCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function Page() {
  const { isLoaded, getToken } = useAuth();
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);
  const [driveName, setDriveName] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const fetchData = async () => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const authToken = await getToken();
    const response = await fetch(API_URL + "/provider", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken!}`,
      },
    });
    return await response.json();
  };

  const { data, error, isLoading } = useSWR("/api/v1/provider", fetchData);

  if (!isLoaded || isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const initiateOAuth = (provider: Provider) => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    const redirectUri = encodeURIComponent("http://localhost:3000/oauth-callback");
    const scope = encodeURIComponent("https://www.googleapis.com/auth/drive.readonly");
    const state = encodeURIComponent(JSON.stringify({ provider, driveName }));
    const url = `${provider.endpoint}?access_type=offline&client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&state=${state}`;
    window.location.href = url;
  };

  const handleAddProvider = () => {
    if (selectedProvider && driveName) {
      initiateOAuth(selectedProvider);
      setIsDialogOpen(false);
      setDriveName("");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 m-4 gap-4">
      {data.data.map((provider: Provider) => (
        <Card key={provider.name}>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CloudIcon className="mr-2 h-6 w-6" />
              {provider.name}
            </CardTitle>
            <CardDescription>Connect your {provider.name} account</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">
              Access and manage your files from {provider.name}.
            </p>
          </CardContent>
          <CardFooter>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="w-full" onClick={() => setSelectedProvider(provider)}>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add {selectedProvider?.name}</DialogTitle>
                  <DialogDescription>
                    Enter a name for this connection. This will help you identify it later.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="driveName" className="text-right">
                      Name
                    </label>
                    <Input
                      id="driveName"
                      value={driveName}
                      onChange={(e) => setDriveName(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={handleAddProvider}>
                    Connect
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
