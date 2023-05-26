"use client";

import React from "react";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { BiImageAdd } from "react-icons/bi";
import Image from "next/image";

export default function NewTweets() {
  const { data: session } = useSession();
  const [tweet, setTweet] = useState("");
  const [photo, setPhoto] = useState("");
  const [image, setImage] = useState(null);

  const CLOUD_NAME = "ditrs9gyv";
  const UPLOAD_PRESET = "my_twitter_clone";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTweet("");
    setImage(null);

    try {
      const imageUrl = await uploadImage();

      const res = await fetch(`http://localhost:3000/api/tweets`, {
        method: "POST",
        body: JSON.stringify({
          tweet,
          imageUrl,
          imageProfile: session?.user.image,
          authorId: session?.user?.id,
        }),
      });

      if (!res.ok) {
        throw new Error("Error occured");
      }

      const tweets = await res.json();
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
    <div>
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
