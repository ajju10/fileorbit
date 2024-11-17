import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import { PlusCircle } from "lucide-react";

export default function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 h-full p-4 bg-slate-100 overflow-y-scroll">
        <h1 className="text-2xl justify-center font-bold mb-6">FileOrbit</h1>
        <Link
          href="/dashboard/providers"
          className="flex items-center border-2 border-cyan-600 hover:bg-slate-300 px-4 py-2 rounded-3xl"
        >
          <PlusCircle className="mr-2 h-5 w-5" />
          Connect Drive
        </Link>
        <div className="flex mt-2 flex-col gap-2">
          {/*{*/}
          {/*  connectedDrives.map((drive) => (*/}
          {/*    <Link*/}
          {/*      to={`/dashboard/${drive.driveId}`}*/}
          {/*      key={drive.driveId}*/}
          {/*      className="flex items-center border-2 border-cyan-600 hover:bg-slate-300 px-4 py-2 rounded-3xl"*/}
          {/*    >*/}
          {/*      <Cloud className="mr-2 h-5 w-5"/>*/}
          {/*      {drive.driveName}*/}
          {/*    </Link>*/}
          {/*  ))*/}
          {/*}*/}
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="border-b-2 p-4 flex bg-slate-50 gap-2 justify-between items-center">
          <p className="font-semibold text-xl">Welcome</p>
          <UserButton />
        </header>
        {children}
      </div>
    </div>
  );
}
