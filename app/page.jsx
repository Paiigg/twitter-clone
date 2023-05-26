"use client";

import { useSession } from "next-auth/react";

import TweetCard from "@/components/TweetCard";
import { useState, useEffect } from "react";
import NewTweets from "@/components/NewTweets";

export default function Home() {
  const { data: session } = useSession();

  const [allTweets, setAllTweets] = useState([]);

  useEffect(() => {
    const fetchTweets = async () => {
      const response = await fetch("http://localhost:3000/api/tweets", {
        cache: "no-store",
      });
      const data = await response.json();

      setAllTweets(data);
    };
    fetchTweets();
  }, []);

  return (
    <div className="lg:border-x min-h-screen">
      <p className="border-b p-3">Home</p>
      <div>{session?.user ? <NewTweets /> : null}</div>

      {allTweets.map((data) => (
        <TweetCard datas={data} />
      ))}
    </div>
  );
}
