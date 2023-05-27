"use client";

import TweetCard from "@/components/TweetCard";
import { useState, useEffect } from "react";
import NewTweets from "@/components/NewTweets";
import { AiOutlineTwitter } from "react-icons/ai";
import Link from "next/link";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  const [providers, setProviders] = useState(null);
  const [dropDown, setDropDown] = useState(false);

  const handleDropDown = () => {
    setDropDown(!dropDown);
  };

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  const [allTweets, setAllTweets] = useState([]);

  useEffect(() => {
    const fetchTweets = async () => {
      const response = await fetch(
        "https://twitter-clone-paiigg.vercel.app/api/tweets",
        {
          cache: "no-store",
        }
      );
      const data = await response.json();

      setAllTweets(data);
    };
    fetchTweets();
  }, []);

  return (
    <div className="lg:border-x min-h-screen">
      {session?.user ? (
        <>
          <Image
            src={session?.user.image}
            width={37}
            height={37}
            className="rounded-full top-3 left-3 absolute lg:hidden"
            onClick={handleDropDown}
            alt="profile"
          />
          {dropDown ? (
            <div className="absolute top-14 lg:hidden">
              <button
                onClick={signOut}
                className="rounded-full border bg-[#1DA1F2]  px-10 py-2  "
              >
                Log out
              </button>
            </div>
          ) : null}
        </>
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
                className="rounded-full bg-[#1DA1F2]  px-10 py-2 text-center absolute top-3 lg:hidden"
              >
                Sign in
              </button>
            ))}
        </>
      )}
      <div className="flex lg:hidden items-center justify-center pt-4">
        <AiOutlineTwitter className="text-center" size={30} color="#1DA1F2" />
      </div>
      <p className="border-b p-3">Home</p>
      <div>{session?.user ? <NewTweets /> : null}</div>

      {allTweets.map((data, i) => (
        <TweetCard key={data._id} datas={data} />
      ))}
    </div>
  );
}
