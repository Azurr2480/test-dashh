"use client";

import React from "react";
import Image from "next/image";
import { useSession, signIn } from "next-auth/react";
import { redirect } from "next/navigation";

export default function page() {
  const { data: session } = useSession();
  if (session) {
    redirect("/");
  }

  return (
    <section className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="bg-gray-100 px-5 py-12 md:w-96 rounded-2xl shadow-lg">
        <div className="px-8">
        <h2 className="font-bold text-2xl text-[#002D74]">เข้าสู่ระบบ</h2>
          
          <div className="mt-2 text-xs text-[#002D74] underline">
            
          </div>
          <div className="mt-6 text-gray-400 grid items-center grid-cols-3">
            <hr className="border-gray-400" />
            <p className="text-center text-sm">Google</p>
            <hr className="border-gray-400" />
          </div>
          <button
            onClick={() => signIn("google")}
            className="bg-white px-2 py-2 mt-5 border w-full rounded-xl 
          flex justify-center items-center text-sm hover:scale-105 duration-300 text-[#002D74]"
          >
            <Image
              src="/img/google-logo.png"
              width={30}
              height={30}
              alt="Google Logo"
            />
            <span className="px-2">เข้าสู่ระบบด้วย Google</span>
          </button>

          
        </div>
      </div>
    </section>
  );
}