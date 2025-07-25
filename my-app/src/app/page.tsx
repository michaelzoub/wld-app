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
import Feed from "@/components/Feed";

// // This would come from environment variables in a real app
// const APP_ID =
//   process.env.NEXT_PUBLIC_WORLDCOIN_APP_ID ||
//   "app_9a73963d73efdf2e7d9472593dc9dffd";

export default function Page() {
  const { data: session, status } = useSession();
  const [walletConnected, setWalletConnected] = useState(false);
  const [verified, setVerified] = useState(false);
  const [tuteClaimed, setTuteClaimed] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(300); // 5 minutes in seconds
  const [claimCount, setClaimCount] = useState(0);
  const [transactionId, setTransactionId] = useState<string>("");
  const [isMinting, setIsMinting] = useState(false);

  // Initialize Viem client
  const client = createPublicClient({
    chain: worldchain,
    transport: http("https://worldchain-mainnet.g.alchemy.com/public"),
  });

  // Track transaction status
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      client,
      appConfig: {
        app_id: process.env.NEXT_PUBLIC_WLD_APP_ID || "",
      },
      transactionId,
    });

  // Check if user is authenticated when session changes
  useEffect(() => {
    if (status === "authenticated" && session?.user?.address) {
      setWalletConnected(true);
      console.log("User authenticated:", session.user);
    }
  }, [session, status]);

  // Update UI when transaction is confirmed
  useEffect(() => {
    if (isConfirmed && !tuteClaimed) {
      setTuteClaimed(true);
      setClaimCount((prevCount) => prevCount + 1);
      setIsMinting(false);
    }
  }, [isConfirmed, tuteClaimed]);

  // Handle wallet connection success
  const handleWalletConnected = () => {
    setWalletConnected(true);
    console.log("Wallet connected");
  };

  // Handle verification success
  const handleVerificationSuccess = () => {
    console.log("Verification success callback triggered in TuteApp");
    setVerified(true);
  };

  // Handle claim success
  const handleClaimSuccess = (txId: string) => {
    console.log("Claim initiated with transaction ID:", txId);
    setTransactionId(txId);
    setIsMinting(true);
  };

  // Timer effect for claim cooldown
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (tuteClaimed && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      // When timer reaches zero, enable claiming again
      setTuteClaimed(false);
      setVerified(false); // Reset verification for next claim cycle
      setTimeRemaining(300); // Reset timer for next claim
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [tuteClaimed, timeRemaining]);

  return (
    <div className="flex flex-col h-[100dvh] bg-white safe-area-inset">
      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center px-6 py-8">
        <h2 className="">Decentrachat</h2>
        <p className="text-gray-400">Post a mood a day and tip inspiring posts.</p>

        {tuteClaimed ? (
          <TuteTimer timeRemaining={timeRemaining} />
        ) : (
          <>
            <div className="text-center my-auto">
              <p className="text-lg">
                {!walletConnected
                  ? "Connect your wallet to continue"
                  : !verified
                  ? "Verify with World ID to claim your TUTE tokens"
                  : <></> }
              </p>

              <TransactionStatus
                isConfirming={isConfirming}
                isConfirmed={isConfirmed}
                isMinting={isMinting}
              />

            {!walletConnected ? (
              <WalletAuthButton onSuccess={handleWalletConnected} />
            ) : !verified ? (
              <VerifyButton onVerificationSuccess={handleVerificationSuccess} />
            ) : (
               /* add app here */
              <main className="flex justify-center items-center w-[90vw]">
                <Feed />
              </main>
            )}
            </div>

          </>
        )}
      </div>
    </div>
  );
}
