import React from "react";
import { FiLogOut } from "react-icons/fi";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

const ProfileBox = () => {
  const session = useSession();
  return (
    <div className="flex items-center gap-2.5">
      <div className="w-10 h-10 rounded-full overflow-hidden">
        <img
          className="w-full h-full object-cover rounded-full "
          src="/image/2.jpg"
          alt=""
        />
      </div>
      <div className=" hidden md:flex items-center gap-2">
        <h3 className="font-medium">{session.data?.user?.name}</h3>
        <button onClick={() => signOut()}>
          <FiLogOut className="text-gray-500 cursor-pointer" />
        </button>
      </div>
    </div>
  );
};

export default ProfileBox;
