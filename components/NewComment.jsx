import React from "react";
import { useSession } from "next-auth/react";
import { BsTrash } from "react-icons/bs";
import Image from "next/image";

export default function NewComment({
  commentText,
  setCommentText,
  setComments,
  id,
}) {
  const { data: session } = useSession();

  const handleComment = async () => {
    if (commentText?.length < 2) {
      alert("Comment must be at least 2 characters long");
      return;
    }

    try {
      const body = {
        tweetId: id,
        authorId: session?.user?.id,
        text: commentText,
      };

      const res = await fetch(
        `https://twitter-clone-paiigg.vercel.app/api/comment`,
        {
          method: "POST",
          body: JSON.stringify(body),
        }
      );

      const newComment = await res.json();

      setComments((prev) => {
        return [newComment, ...prev];
      });

      setCommentText("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {session?.user ? (
        <div className="flex items-start p-3 gap-4 border-b">
          <Image
            src={session?.user.image}
            width={37}
            height={37}
            className="rounded-full"
            alt="profile"
          />
          <div className="w-full">
            <p>{session?.user?.name}</p>
            <input
              className="text-slate-400 text-lg bg-transparent focus:outline-none w-full"
              placeholder="Comment here!"
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <div className="flex items-center gap-4 mt-4 justify-end">
              <button
                className="rounded-full bg-[#1DA1F2]  px-10 py-2 text-center"
                onClick={handleComment}
              >
                Comment
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
