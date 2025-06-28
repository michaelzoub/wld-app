"use client";
import { Home, Plus, User } from "lucide-react"
import { useEffect, useState } from "react";

interface inputOptions {
    placeholder: string,
    onChange?: ChangeEventHandler<HTMLInputElement>,
    value: string | undefined,
    height: string
}

export default function GlobalInput({placeholder, onChange, value, height}: inputOptions) {

  return (
    <input className={`p-2 rounded-lg border border-[1px] h-${height}`} placeholder={placeholder} onChange={onChange} value={value} />
  )
}
