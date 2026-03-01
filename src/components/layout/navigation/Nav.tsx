"use client";
import ProfileBox from "@/components/ui/Profile/ProfileBox";
import SearchBar from "@/components/ui/search/SearchBar";

import React from "react";

const Nav = () => {
  return (
    <div className="h-18 border-b border-border flex items-center justify-between ">
      <div className="w-64 border-r hidden border-border lg:flex items-center justify-center h-full font-semibold shrink-0">
        Todo App
      </div>
      <div className="flex items-center justify-between w-full px-8 md:px-18">
        <SearchBar />
        <ProfileBox />
      </div>
    </div>
  );
};

export default Nav;
