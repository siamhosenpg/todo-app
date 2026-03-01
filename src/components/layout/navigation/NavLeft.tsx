import React from "react";
import { RiHome5Line } from "react-icons/ri";
import { IoIosToday } from "react-icons/io";
import { MdPendingActions } from "react-icons/md";
import { GrCompliance } from "react-icons/gr";
import Link from "next/link";

const naveData = [
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
    name: "Panding tasks",
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
  return (
    <div className="w-64 h-full border-r border-border  shrink-0">
      <div className="flex flex-col mt-6 gap-1">
        {naveData.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="h-12  pl-10  px-4 hover:bg-background-secondary flex items-center"
          >
            <span className="mr-4">{item.icon}</span>
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NavLeft;
