import { AvatarComponentsId } from "@/schemas/public/AvatarComponents";
import Users from "@/schemas/public/Users";
import { keyof } from "zod";
import { TypeOf } from "zod/v3";

export interface User extends Users {};

export const UserBasicFields = [
    'name', 
    'avatar_colour', 
    'avatar_eyes', 
    'avatar_mouth'
] as const satisfies readonly (keyof User)[];
export type UserBasicDTO = Pick<User, typeof UserBasicFields[number]>
