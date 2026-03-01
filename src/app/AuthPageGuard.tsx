"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

type Props = {
  children: React.ReactNode;
};

export default function AuthPageGuard({ children }: Props) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    if (session) {
      router.push("/"); // redirect to home if already logged in
    }
  }, [session, status, router]);

  if (session) return null; // prevent flashing login page

  return <>{children}</>;
}
