"use client";
import { Home, Plus, User } from "lucide-react"
import { useEffect } from "react";
import Link from "next/link";

interface Verified {
    verified: boolean
}

export default function Footer({ verified }: Verified) {

    useEffect(() => {
        console.log(verified)
    }, [verified])

  return (
  <>
  {verified ? (
    <footer className="fixed bottom-0 left-0 right-0 p-4 mb-4  text-black" >
      <div className="flex justify-around items-center max-w-md mx-auto">
        <button className="p-2">
            <Link href="/">
          <Home className="w-6 h-6" />
          </Link>
        </button>
        <button className="p-2" >
          <Link href="/newpost">
          <Plus className="w-6 h-6" />
          </Link>
        </button>
        <button className="p-2">
          <Link href="/profile">
          <User className="w-6 h-6" />
          </Link>
        </button>
      </div>
    </footer>) : <></> }
    </>
  )
}
