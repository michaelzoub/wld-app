import { atom } from "jotai";
import { post } from "@/types/post";

export const postsAtom = atom<post[] | null>([]);