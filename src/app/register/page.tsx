"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthPageGuard from "../AuthPageGuard";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.message);
      setLoading(false);
      return;
    }

    router.push("/api/auth/login");
  };

  return (
    <AuthPageGuard>
      <div className="flex justify-center items-center mt-40">
        <div className="flex flex-col gap-4 w-80 border-border border  bg-background-secondary p-6 rounded-lg ">
          <form onSubmit={handleRegister} className="flex flex-col gap-3">
            <h2 className="text-2xl font-bold text-center">Register</h2>

            <input
              type="text"
              placeholder="Name"
              className="w-full border border-border bg-background rounded-md p-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="email"
              placeholder="Email"
              className="w-full border border-border bg-background rounded-md p-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full border border-border bg-background rounded-md p-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-700 text-white p-2 rounded"
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
          <p className="mt-4 text-sm">
            Already have an account?{" "}
            <button
              onClick={() => router.push("/api/auth/login")}
              className="text-blue-500 hover:underline"
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </AuthPageGuard>
  );
}
