"use client"; // Ensures this is a Client Component

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { FiMenu } from "react-icons/fi"; // Ensure you have react-icons installed

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession(); // Get authentication status
  const [hydrated, setHydrated] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
  ];

  if (!hydrated) return null;

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
      {/* Left Side - Navigation Links (Hidden in Small Screens) */}
      <div className="hidden md:flex space-x-4">
        {navItems.map((item) => (
          <Link key={item.path} href={item.path} passHref>
            <span
              className={`px-4 py-2 rounded text-white cursor-pointer ${
                pathname === item.path ? "bg-blue-500" : "hover:bg-gray-600"
              }`}
            >
              {item.name}
            </span>
          </Link>
        ))}
      </div>

      {/* Mobile Menu Button */}
      <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
        <FiMenu className="text-white text-2xl" />
      </button>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-gray-900 text-white flex flex-col items-start space-y-2 p-4 shadow-lg md:hidden  z-50">
          {navItems.map((item) => (
            <Link key={item.path} href={item.path} passHref>
              <span
                className={`px-4 py-2 w-full text-white text-left ${
                  pathname === item.path ? "bg-blue-500" : "hover:bg-gray-600"
                }`}
              >
                {item.name}
              </span>
            </Link>
          ))}
        </div>
      )}

      {/* Right Side - User Dropdown */}
      {session && (
        <div className="relative">
          <div
            className="flex items-center space-x-4 cursor-pointer"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            {session.user?.image && (
              <img
                src={session.user.image}
                alt="User Image"
                className="w-10 h-10 rounded-full border"
              />
            )}
          </div>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-lg z-50">
              {/* Display Username */}
              <div className="px-4 py-2 border-b text-gray-800 font-semibold">
                {session.user?.name}
              </div>

              {/* Sign Out Button */}
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="block w-full text-left px-4 py-2 hover:bg-gray-200"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
