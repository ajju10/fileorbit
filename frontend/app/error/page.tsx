"use client";

import { useSearchParams } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();
  const message = searchParams.get("message");

  return (
    <div>
      <h2>Something went wrong!</h2>
      <span>{message}</span>
    </div>
  );
}
