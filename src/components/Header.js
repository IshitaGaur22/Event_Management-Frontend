import React from "react";

const Header = ({ location }) => {
  return (
    <header className="w-full shadow-sm border-b bg-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        
        {/* Left: Logo */}
        <div className="flex items-center space-x-2">
          <img src="./emLogo.png" alt="Logo" className="w-8 h-8" />
          <span className="font-bold text-lg">SIMBA</span>
        </div>

        {/* Center: Location (hidden on small screens) */}
        {/* <div className="hidden md:flex flex-col text-sm">
          <span className="font-semibold">{location.city}</span>
          <span className="text-gray-500">{location.state}</span>
        </div> */}

        {/* Right: Profile Icon */}
        <div>
          <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
            <img src="/profile.jpg" alt="Profile" />
          </div>
        </div>
      </div>

      {/* Mobile: Location below header */}
      {/* <div className="md:hidden px-4 pb-2 text-sm">
        <span className="font-semibold">{location.city}</span>,{" "}
        <span className="text-gray-500">{location.state}</span>
      </div> */}
    </header>
  );
};

export default Header;