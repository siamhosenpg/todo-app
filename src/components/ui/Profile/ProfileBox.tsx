import React from "react";

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
      <div>
        <h3 className="font-medium ">Rofiqul Islam</h3>
      </div>
    </div>
  );
};

export default ProfileBox;
