"use client";

import AuthPageGuard from "@/app/AuthPageGuard";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    await signIn("credentials", {
      email,
      password,
      callbackUrl: "/",
    });
  };

  return (
    <AuthPageGuard>
      <div className="flex justify-center items-center mt-40">
        <div className="flex flex-col gap-4 w-80 border-border border h-full bg-background-secondary p-6 rounded-lg ">
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="border border-border bg-background rounded-md p-2"
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="border border-border bg-background rounded-md p-2"
          />
          <button
            onClick={handleLogin}
            className="bg-green-700 rounded-md text-white p-2"
          >
            Login
          </button>
          <p className="mt-4 text-sm">
            Don't have an account?{" "}
            <button
              onClick={() => router.push("/register")}
              className="text-blue-500 hover:underline"
            >
              Register
            </button>
          </p>
        </div>
      </div>
    </AuthPageGuard>
  );
}
