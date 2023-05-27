"use client";

import React from "react";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Righbar() {
  const [user, setUser] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(
        "https://twitter-clone-paiigg.vercel.app/api/users",
        {
          cache: "no-store",
        }
      );
      const data = await response.json();

      setUser(data);
    };
    fetchUser();
  }, []);
  return (
    <div className="hidden  lg:block mx-auto  p-5">
      <p className="font-semibold text-lg">On Twitter</p>
      <div className="bg-white/20 gap-4 w-[300px] flex flex-col mt-4 p-4 rounded-lg">
        {user?.map((user) => (
          <div className="flex items-center gap-2">
            <Image
              src={user.image}
              width={49}
              height={49}
              className="rounded-full object-cover"
              alt="profile"
            />
            <div>
              <p className="font-semibold">{user.username}</p>
              <p className="text-xs text-slate-300">{user.email}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
