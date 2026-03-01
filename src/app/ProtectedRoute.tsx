"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

type Props = {
  children: React.ReactNode;
};

export default function ProtectedRoute({ children }: Props) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // wait until session loads
    if (!session) {
      router.push("/api/auth/login"); // redirect if not logged in
    }
  }, [session, status, router]);

  if (!session) return null; // or a loading spinner

  return <>{children}</>;
}
