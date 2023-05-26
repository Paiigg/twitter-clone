"use client";

import TweetCard from "@/components/TweetCard";
import React from "react";
import { useState, useEffect } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useRouter } from "next/navigation";

export default function page({ params }) {
  const [detail, setDetail] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchDetail = async () => {
      const response = await fetch(
        `http://localhost:3000/api/tweets/${params.id}`,
        {
          cache: "no-store",
        }
      );
      const data = await response.json();

      console.log(data);
      setDetail(data);
    };
    fetchDetail();
  }, []);

  return (
    <div className="lg:border-x min-h-screen">
      <div className="flex items-center pl-4 border-b">
        <AiOutlineArrowLeft
          size={20}
          onClick={() => router.push("/")}
          className="cursor-pointer"
        />
        <h3 className="text-lg p-3">Tweet</h3>
      </div>
      <div>
        <TweetCard datas={detail} id={params.id} />
      </div>
    </div>
  );
}
