"use client";

import React from "react";
import { AiOutlineTwitter, AiFillHome } from "react-icons/ai";
import { CiCircleMore } from "react-icons/ci";
import {
  BsHash,
  BsBellFill,
  BsEnvelope,
  BsBookmark,
  BsPerson,
  BsCardList,
} from "react-icons/bs";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  return (
    <div className="py-5 space-y-4 h-screen ">
      <AiOutlineTwitter size={30} />
      <div className="flex flex-col gap-24  items-start">
        <div className="flex flex-col items-start gap-5">
          <div className="flex items-center space-x-2">
            <AiFillHome size={16} />
            <Link href="/" className="text-lg">
              Home
            </Link>
          </div>
          <div className="flex items-center space-x-2">
            <BsHash size={16} />
            <Link href="/explore" className="text-lg">
              Explore
            </Link>
          </div>
          <div className="flex items-center space-x-2">
            <BsBellFill size={16} />
            <Link href="/" className="text-lg">
              Notification
            </Link>
          </div>
          <div className="flex items-center space-x-2">
            <BsEnvelope size={16} />
            <Link href="/" className="text-lg">
              Messages
            </Link>
          </div>
          <div className="flex items-center space-x-2">
            <BsBookmark size={16} />
            <Link href="/" className="text-lg">
              Bookmarks
            </Link>
          </div>
          <div className="flex items-center space-x-2">
            <BsCardList size={16} />
            <Link href="/" className="text-lg">
              List
            </Link>
          </div>
          <div className="flex items-center space-x-2">
            <BsPerson size={16} />
            <Link href="/" className="text-lg">
              Profile
            </Link>
          </div>
          <div className="flex items-center space-x-2">
            <CiCircleMore size={16} />
            <Link href="/" className="text-lg">
              More
            </Link>
          </div>
          {session?.user ? (
            <div className="flex gap-3 items-center">
              <Link
                href="/tweet"
                className="rounded-full bg-[#1DA1F2]  px-10 py-2 text-center"
              >
                Tweet
              </Link>
              <button
                onClick={signOut}
                className="rounded-full border border-[#1DA1F2] text-[#1DA1F2] px-10 py-2 "
              >
                Log out
              </button>
            </div>
          ) : (
            <>
              {providers &&
                Object.values(providers).map((provider) => (
                  <button
                    type="button"
                    key={provider.name}
                    onClick={() => {
                      signIn(provider.id);
                    }}
                    className="rounded-full bg-[#1DA1F2]  px-10 py-2 text-center"
                  >
                    Sign in
                  </button>
                ))}
            </>
          )}
        </div>

        {session?.user ? (
          <div className="flex items-center space-x-2">
            <Image
              src={session?.user.image}
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
            />
            <p>{session?.user.email}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
