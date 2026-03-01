"use client";

import React from "react";
import { RiHome5Line } from "react-icons/ri";
import { IoIosToday } from "react-icons/io";
import { MdPendingActions } from "react-icons/md";
import { GrCompliance } from "react-icons/gr";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navData = [
  {
    name: "Home",
    href: "/",
    icon: <RiHome5Line className="text-xl" />,
  },
  {
    name: "Today tasks",
    href: "/today",
    icon: <IoIosToday className="text-xl" />,
  },
  {
    name: "Pending tasks",
    href: "/pending",
    icon: <MdPendingActions className="text-xl" />,
  },
  {
    name: "Completed tasks",
    href: "/completed",
    icon: <GrCompliance className="text-xl" />,
  },
];

const NavLeft = () => {
  const pathname = usePathname(); // current route

  return (
    <div className="w-64 h-full border-r border-border shrink-0 hidden lg:block">
      <div className="flex flex-col mt-6 gap-1">
        {navData.map((item) => {
          const isActive = pathname === item.href; // check active page

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`h-12 pl-10 px-4 flex items-center transition-colors 
                ${isActive ? "bg-green-100 text-green-700 font-semibold" : "hover:bg-background-secondary "}`}
            >
              <span className="mr-4">{item.icon}</span>
              {item.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default NavLeft;
