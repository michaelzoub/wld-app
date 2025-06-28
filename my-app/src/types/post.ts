import { user } from "./user"

export type post = {
    id: number,
    world_username: string,
    poster: string,
    message: string,
    image: string,
    tips: number,
    likes: number,
    likers: Array<String>, //change to Array<user> later
    contentURI: string,
}