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
      <div className="flex flex-col mt-6 gap-1">
        {naveData.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className="h-12  pl-16  px-4 hover:bg-background-secondary flex items-center"
          >
            {item.name}
          </a>
        ))}
      </div>
    </div>
  );
};

export default NavLeft;
