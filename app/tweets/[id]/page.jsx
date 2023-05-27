"use client";

import TweetCard from "@/components/TweetCard";
import React from "react";
import { useState, useEffect } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useRouter } from "next/navigation";
import NewComment from "@/components/NewComment";
import Comment from "@/components/Comment";

export default function page({ params }) {
  const [detail, setDetail] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const router = useRouter();

  console.log({ params });

  useEffect(() => {
    const fetchDetail = async () => {
      const response = await fetch(
        `https://twitter-clone-paiigg.vercel.app/api/tweets/${params.id}`,
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

  useEffect(() => {
    async function fetchComments() {
      const res = await fetch(
        `https://twitter-clone-paiigg.vercel.app/api/comment/${params.id}`,
        {
          cache: "no-store",
        }
      );
      const comment = await res.json();
      console.log(comment);

      setComments(comment);
    }
    fetchComments();
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
        <TweetCard datas={detail} id={params.id} comment={comments} />
      </div>
      <NewComment
        commentText={commentText}
        setCommentText={setCommentText}
        id={params.id}
        setComments={setComments}
      />
      {comments?.length > 0
        ? comments.map((comment) => (
            <Comment
              key={comment._id}
              comments={comment}
              setComments={setComments}
            />
          ))
        : null}
    </div>
  );
}
