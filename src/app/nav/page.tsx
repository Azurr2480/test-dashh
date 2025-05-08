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
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">My Dashboard</h1>

      {session?.user && (
        <div className="flex items-center gap-4 ml-auto">
          <img
            src={session.user.image ?? "/default-avatar.png"}
            alt="User Avatar"
            className="w-10 h-10 rounded-full border"
          />

          <span className="text-gray-700">{session.user.name}            </span>

          <button
            onClick={() => signOut()}
            className="bg-red-500 text-white px-4 py-2 rounded-md bg-danger"
          >
            Sign Out
          </button>
        </div>
      )}
    </nav>
  );
}
