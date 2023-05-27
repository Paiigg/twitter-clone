"use client";

import React from "react";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { BiImageAdd } from "react-icons/bi";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Edit({ params }) {
  const { data: session } = useSession();
  const [tweet, setTweet] = useState("");
  const [photo, setPhoto] = useState("");
  const [image, setImage] = useState(null);

  const router = useRouter();

  console.log({ params });

  const CLOUD_NAME = "ditrs9gyv";
  const UPLOAD_PRESET = "my_twitter_clone";

  useEffect(() => {
    async function fetchTweet() {
      const res = await fetch(
        `https://twitter-clone-paiigg.vercel.app/api/tweets/${params.id}`
      );

      const data = await res.json();

      setTweet(data.tweet);
      setImage(data.imageUrl);
    }
    fetchTweet();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTweet("");
    setImage(null);

    try {
      let imageUrl = null;
      if (photo) {
        imageUrl = await uploadImage();
      }

      const body = {
        tweet,
      };

      if (imageUrl != null) {
        body.imageUrl = imageUrl;
      }

      const res = await fetch(
        `https://twitter-clone-paiigg.vercel.app/api/tweets/${ctx.params.id}`,
        {
          method: "PUT",
          body: JSON.stringify(body),
        }
      );

      if (!res.ok) {
        throw new Error("Error has occured");
      }

      const tweets = await res.json();

      router.push(`/tweets/${tweets?._id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const uploadImage = async () => {
    if (!photo) return;

    const formData = new FormData();

    formData.append("file", photo);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      const imageUrl = data["secure_url"];

      return imageUrl;
    } catch (error) {
      console.log(error);
    }
  };

  const onImageChange = (event) => {
    setPhoto(event.target.files[0]);
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  return (
    <div className="lg:border-x min-h-screen">
      <div className="flex items-center pl-4 border-b">
        <AiOutlineArrowLeft
          size={20}
          onClick={() => router.push(`/tweets/${ctx.params.id}`)}
          className="cursor-pointer"
        />
        <h3 className="text-lg p-3">Edit Tweet</h3>
      </div>
      <div className="flex items-start p-3 gap-4 border-b">
        <Image
          src={session?.user.image}
          width={37}
          height={37}
          className="rounded-full"
          alt="profile"
        />
        <div className="w-full">
          <form onSubmit={handleSubmit}>
            <input
              className="text-slate-400 text-lg bg-transparent focus:outline-none"
              placeholder="What's happening?"
              type="text"
              value={tweet}
              onChange={(e) => setTweet(e.target.value)}
            />
            <img src={image} className="object-cover " />
            <div className="flex justify-between items-center w-full mt-3">
              <label htmlFor="image">
                <BiImageAdd size={25} color="#1DA1F2" />
              </label>
              <input
                id="image"
                className="hidden"
                type="file"
                onChange={onImageChange}
              />

              <button className="rounded-full bg-[#1DA1F2]  px-10 py-2 text-center">
                Tweet
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
