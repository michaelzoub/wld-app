"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { MiniKit } from "@worldcoin/minikit-js";
import { useAtom } from "jotai";
import { walletAddress } from "@/atoms/walletAddress";

interface WalletAuthButtonProps {
  onSuccess?: () => void;
}

export function WalletAuthButton({ onSuccess }: WalletAuthButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [, setWalletAddress] = useAtom(walletAddress);

  const handleWalletAuth = async () => {
    if (!MiniKit.isInstalled()) {
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/nonce");
      const { nonce } = await res.json();
      console.log("nonce", nonce);
      const { finalPayload } = await MiniKit.commandsAsync.walletAuth({
        nonce,
        expirationTime: new Date(new Date().getTime() + 1 * 60 * 60 * 1000),
        statement: "Sign in with your World ID wallet",
      });

      if (finalPayload.status === "error") {
        throw new Error(finalPayload.error_code);
      }

      const verifyRes = await fetch("/api/complete-siwe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          payload: finalPayload,
          nonce,
        }),
      });
      console.log("verifyRes", verifyRes);
      const verification = await verifyRes.json();
      console.log("verification", verification);

      if (verification.isValid) {
        await signIn("worldcoin-wallet", {
          message: finalPayload.message,
          signature: finalPayload.signature,
          address: finalPayload.address,
          nonce,
          redirect: false,
        });

        //emit atom globally
        console.log(finalPayload.address);
        setWalletAddress(finalPayload.address);

        // Call onSuccess if provided
        if (onSuccess) onSuccess();
      }
    } catch (error) {
      console.error("Wallet auth error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleWalletAuth}
      disabled={isLoading}
      className="px-4 py-2 mt-4 bg-pink-400 hover:bg-pink-500/80 text-white rounded-2xl border-2 border-pink-300/50 shadow-md transition-colors disabled:opacity-50 tracking-wide"
    >
      {isLoading ? (
        <div className="flex items-center">
          <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          <span className="">Connecting...</span>
        </div>
      ) : (
        <div className="flex items-center">
          <span className="">Connect Wallet</span>
        </div>
      )}
    </button>
  );
}
