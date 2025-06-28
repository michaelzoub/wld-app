"use client";
import { Home, Plus, User } from "lucide-react"
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { post } from "@/types/post";
import { Heart, HandCoins } from "lucide-react";
import { postsAtom } from "@/atoms/posts";
import { useAtom } from "jotai";

const testArray: post[] = [
  {
    id: 1,
    world_username: "Baber",
    poster: "0xFFFF0990M0M0MMMMXMMX",
    message: "Flaosdlasoldasod",
    image: "",
    tips: 239.34,
    likes: 5,
    likers: ["mockUser"],
    contentURI: "https://example.com"
  },
  {
    id: 2,
    world_username: "Jamona",
    poster: "0xFFFF0990M0M0MMMMXMMX",
    message: "Flaosdlasoldasod",
    image: "",
    tips: 2334.34,
    likes: 3,
    likers: [],
    contentURI: "https://example.com"
  },
  {
    id: 3,
    world_username: "Fidel",
    poster: "0xFFFF0990M0M0MMMMXMMX",
    message: "Flaosdlasoldasod",
    image: "",
    tips: 239.34,
    likes: 10,
    likers: ["mockUser"],
    contentURI: "https://example.com"
  }
];

export default function Feed() {

  const [data, setData] = useAtom(postsAtom);
  const [like, setLike] = useState<post[]>([]);

    useEffect(() => {
      //fetch most recent posts from SC.
      setData(testArray);
      console.log("feed hit")
      //setData(testArray);
    }, []);

  function handleLike(e) {
    e.likes++;
    setLike((prevArray) => [...(prevArray ?? []), e]);
  }

  return (
    <main className="w-full">
      <div className="flex flex-col gap-2 rounded-lg p-2 border-zinc-400 max-h-[75vh] overflow-y-auto">
        {data?.map((e) => (
          <div key={e.id} className="p-3 border border-zinc-400 rounded-lg flex flex-col gap-2">
            <header className="flex items-center gap-2">
              <Image
                src="/default-avatar.png" // replace with actual src or identicon
                alt="avatar"
                width={32}
                height={32}
                className="rounded-full"
              />
              <div className="flex flex-col items-left flex-start text-left">
                <span className="font-bold">{e.world_username}</span>
                <span className="text-gray-500 text-xs truncate max-w-[70px]">{e.poster}</span>
              </div>
            </header>

            <div className="text-sm text-left p-4">
              {e.message}
            </div>

            <div className="flex justify-between text-xs text-gray-700 mt-2">
              <div className="flex items-center gap-1">
                <HandCoins></HandCoins> <span>{e.tips.toFixed(2)}</span>
              </div>
              <div className="flex items-center gap-1" onClick={() => handleLike(e)}>
                { like?.find((insideLike) => insideLike.id == e.id) ? <Heart className="text-red-500"></Heart> : <Heart></Heart> } <span>{e.likes}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
