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
    <nav className="bg-white shadow-md p-4 flex justify-between items-center shadow-sm">
      <h1 className="text-xl font-bold">My Dashboard</h1>

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

