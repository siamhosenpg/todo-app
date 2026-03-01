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
  const SiamidLogin = async () => {
    await signIn("credentials", {
      email: "siamhosen227@gmail.com",
      password: "123456",
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
            className="flex items-center  gap-2 bg-background cursor-pointer p-2 rounded-md"
            onClick={handleLogin}
          >
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src="/image/2.jpg"
                alt=""
              />
            </div>
            <div>Siam Hosen</div>
          </button>
          <button
            onClick={SiamidLogin}
            className="bg-green-700 cursor-pointer active:opacity-70 rounded-md text-white p-2"
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
