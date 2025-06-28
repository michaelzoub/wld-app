"use client";
import { Home, Plus, User } from "lucide-react"
import { useEffect, useState } from "react";
import GlobalInput from "./GlobalInput";
import { post } from "@/types/post";
import { postsAtom } from "@/atoms/posts";
import { postAtom } from "@/atoms/post";
import { useAtom } from "jotai";

interface createPost {
    username: string,
    walletAddress: string
}

export default function CreatePost({username, walletAddress}: createPost) {

    const [post, setPost] = useAtom(postAtom);
    const [posts, setPosts] = useAtom(postsAtom);

    useEffect(() => {
        setPost({
        id: 0,
        world_username: username,
        poster: walletAddress,
        message: "",
        image: "",
        tips: 0,
        likes: 0,
        likers: [""], //change to Array<user> later
        contentURI: "",
    })
    }, [])

    useEffect(() => {
        console.log(posts)
    }, [posts])

    function globalHandle(e: React.ChangeEvent<HTMLInputElement>, type: string) {
        const newMessage = e.target.value;
        setPost((prev) => {
        if (!prev) {
            return {
            id: 0,
            world_username: "",
            poster: "",
            message: newMessage,
            image: "",
            tips: 0,
            likes: 0,
            likers: [],
            contentURI: "",
            };
        }
        if (type == "title") {
            return {
                ...prev,
                title: newMessage,
            };
        } else if (type == "message") {
            return {
                ...prev,
                message: newMessage,
            };
        } else {
            return { ...prev }
        }
        });
    }


    function handleMessageChange(e: React.ChangeEvent<HTMLInputElement>) {
        return globalHandle(e, "message");
    }

    function submitPost() {
        setPosts((prevPosts) => [...(prevPosts ?? []), post]);
    }



  return (
    <form onSubmit={submitPost}>
        <GlobalInput placeholder="Enter message" onChange={handleMessageChange} value={post?.message} height="100px"></GlobalInput>
        <button className="p-2 rounded-lg border border-[1px]" onClick={submitPost}>Submit</button>
    </form>
  )
}
