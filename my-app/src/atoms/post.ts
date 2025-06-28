import { atom } from "jotai";
import { post } from "@/types/post";

export const postAtom = atom<post | null>();