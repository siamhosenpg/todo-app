import React from "react";

const naveData = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Today tasks",
    href: "/today",
  },
  {
    name: "Upcoming tasks",
    href: "/upcoming",
  },
  {
    name: "Completed tasks",
    href: "/completed",
  },
];

const NavLeft = () => {
  return (
    <div className="w-64 h-full border-r border-border  shrink-0">
      <div className="flex flex-col mt-6">
        {naveData.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className="h-12  flex items-center justify-center px-4 hover:bg-gray-100"
          >
            {item.name}
          </a>
        ))}
      </div>
    </div>
  );
};

export default NavLeft;
