import React, { useState } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { FiMoreHorizontal } from "react-icons/fi";
import { AiOutlineHeart } from "react-icons/ai";
import { useSession } from "next-auth/react";
import { BiComment } from "react-icons/bi";

export default function TweetCard({
  datas,
  id,
  comment,
}: {
  datas: any;
  id: string;
  comment: any[];
}) {
  const { data: session } = useSession();

  const [toggle, setToggle] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

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
        const res = await fetch(
          `https://twitter-clone-paiigg.vercel.app/api/tweets/${id}`,
          {
            method: "DELETE",
          }
        );

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
      <div className="w-full">
        <div className="flex justify-between items-center">
          <div onClick={handleDetail} className="w-full">
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
                {pathname === `/tweets/${datas._id}` ? (
                  <>
                    <button onClick={() => router.push(`/edit/${datas._id}`)}>
                      Edit
                    </button>
                    <button onClick={handleDelete}>Delete</button>
                  </>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
        <div>
          <Image
            width={511}
            height={250}
            src={datas.imageUrl}
            className="rounded-lg object-cover lg:object-fill lg:h-[300px] my-2 "
            alt="profile"
          />
        </div>
        <div className="flex items-center gap-10">
          <div>
            <AiOutlineHeart />
            <p></p>
          </div>
          <div className="flex items-center gap-2">
            <BiComment />
            <p>{comment?.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
