import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FiMoreHorizontal } from "react-icons/fi";
import { AiOutlineHeart } from "react-icons/ai";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function TweetCard({ datas, id }: { datas: any; id: string }) {
  const { data: session } = useSession();

  const [toggle, setToggle] = useState(false);

  const router = useRouter();
  const handleDetail = () => {
    router.push(`/tweets/${datas._id}`);
  };

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const handleDelete = async () => {
    try {
      const confirmModal = confirm(
        "Are you sure you want to delete your tweet?"
      );

      if (confirmModal) {
        const res = await fetch(`http://localhost:3000/api/tweets/${id}`, {
          method: "DELETE",
        });

        if (res.ok) {
          router.push("/");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-start p-3 gap-4 border-b">
      <Image
        src={datas.imageProfile}
        width={49}
        height={49}
        className="rounded-full object-cover"
        alt="profile"
      />
      <div>
        <div className="flex justify-between items-center">
          <div>
            <p className="font-semibold">{datas.authorId?.username}</p>
            <p>{datas.tweet}</p>
          </div>

          <div className="relative">
            {session?.user?.email === datas?.authorId?.email ? (
              <FiMoreHorizontal size={25} onClick={handleToggle} />
            ) : null}
            {toggle ? (
              <div className="absolute rounded-lg bg-[#1DA1F2] p-3 right-0">
                <button onClick={handleDetail}>Detail</button>
                <button onClick={() => router.push(`/edit/${datas._id}`)}>
                  Edit
                </button>
                <button onClick={handleDelete}>Delete</button>
              </div>
            ) : null}
          </div>
        </div>
        <Image
          src={datas.imageUrl}
          width={512}
          height={200}
          className="rounded-lg object-cover mb-2"
          alt="profile"
        />
        <div>
          <AiOutlineHeart />
          <p></p>
        </div>
      </div>
    </div>
  );
}
