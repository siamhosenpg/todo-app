"use client";
import NavLeft from "./NavLeft";
import { usePathname } from "next/navigation";

export default function NavLeftWrapper() {
  const pathname = usePathname();

  // যেসব রুটে navbar দেখাবেন না:
  const hiddenRoutes = ["/api/auth/login", "/register"];
  if (hiddenRoutes.includes(pathname)) {
    return null; // NavLeft component hide হবে
  }

  return <NavLeft />;
}
