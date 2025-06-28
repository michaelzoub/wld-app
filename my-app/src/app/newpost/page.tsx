"use client";

import { useState, useEffect } from "react";
import CreatePost from "@/components/CreatePost";
import { MiniKit } from "@worldcoin/minikit-js";

// // This would come from environment variables in a real app
// const APP_ID =
//   process.env.NEXT_PUBLIC_WORLDCOIN_APP_ID ||
//   "app_9a73963d73efdf2e7d9472593dc9dffd";

export default function Page() {

    const [username, setUsername] = useState(MiniKit.user.username);

    useEffect(() => {
        console.log(username);
    }, [])

  return (
    <div className="flex flex-col h-[100dvh] bg-white safe-area-inset items-center justify-center">
      <CreatePost />
    </div>
  );
}
