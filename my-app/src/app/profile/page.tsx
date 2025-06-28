"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { TuteTimer } from "@/components/TuteTimer";
import { VerifyButton } from "@/components/VerifyButton";
import { ClaimButton } from "@/components/ClaimButton";
import { WalletAuthButton } from "@/components/wallet-auth-button";
import { useWaitForTransactionReceipt } from "@worldcoin/minikit-react";
import { createPublicClient, http } from "viem";
import { worldchain } from "@/lib/chains";
import { TransactionStatus } from "@/components/TransactionStatus";
import Footer from "@/components/Footer";
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
    <div className="flex flex-col h-[100dvh] bg-white safe-area-inset">
        <div>test</div>
    </div>
  );
}
