import React from "react";

const TopBar = () => {
  return (
    <div className="flex items-center bg-gray-500 text-white px-6 py-3">
      <div className="font-bold text-lg mr-25">RAIQA</div>
      <div className="flex gap-6">
          <button>Home</button>
          <button>Services</button>
          <button>About</button>        
          <button>Contact us</button>
          <button>Login</button>
          <button>Sign up</button>
      </div>
    </div>
  );
};

export default TopBar;
