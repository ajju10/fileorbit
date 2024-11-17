import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="bg-slate-100 flex items-center justify-center min-h-screen">
      <SignIn forceRedirectUrl="/dashboard" />
    </div>
  );
}
