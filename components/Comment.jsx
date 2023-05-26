"use client";

import React from "react";
import Image from "next/image";
import { BsTrash } from "react-icons/bs";
import { useSession } from "next-auth/react";

export default function Comment({ setComments, comments }) {
  const { data: session } = useSession();

  const handleDeleteComment = async () => {
    try {
      await fetch(`http://localhost:3000/api/comment/${comments?._id}`, {
        method: "DELETE",
      });

      setComments((prev) => {
        return [...prev].filter((c) => c?._id !== comments?._id);
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex items-center p-3 gap-4 border-b relative">
      <Image
        src={comments?.authorId.image}
        width={37}
        height={37}
        className="rounded-full"
        alt="profile"
      />
      <div className="w-full ">
        <p className="text-lg font-semibold">{comments?.authorId.username}</p>
        <p>{comments?.text}</p>
      </div>
      {session?.user?.id === comments?.authorId?._id && (
        <BsTrash
          className="absolute top-4 right-4"
          onClick={handleDeleteComment}
        />
      )}
    </div>
  );
}
