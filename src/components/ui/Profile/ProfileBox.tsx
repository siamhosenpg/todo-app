import React from "react";
import { FiLogOut } from "react-icons/fi";

const ProfileBox = () => {
  return (
    <div className="flex items-center gap-2.5">
      <div className="w-10 h-10 rounded-full overflow-hidden">
        <img
          className="w-full h-full object-cover rounded-full "
          src="/image/2.jpg"
          alt=""
        />
      </div>
      <div className="flex items-center gap-2">
        <h3 className="font-medium ">Rofiqul Islam</h3>
        <FiLogOut className="text-gray-500 cursor-pointer" />
      </div>
    </div>
  );
};

export default ProfileBox;
