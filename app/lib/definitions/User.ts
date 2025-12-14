import Users from "@/schemas/public/Users";
import { z } from "zod";

export interface User extends Users {};

export const UserBasicFields = [
    'name', 
    'avatar_colour', 
    'avatar_eyes', 
    'avatar_mouth'
] as const satisfies readonly (keyof User)[];
export type UserBasicDTO = Pick<User, typeof UserBasicFields[number]>

export const UserCreationFields = [
  'name',
  'email',
  'avatar_colour',
  'avatar_eyes',
  'avatar_mouth',
  'date_of_birth',
  'password',
  'phone_number'
] as const satisfies readonly (keyof User)[];
export type UserCreationDTO = Pick<User, typeof UserCreationFields[number]>

export const registerUserSchema = z.object({
  username: z.string().min(1, { message: "Required"}).max(15, { message: "Username can be at most 15 characters"}),
  email: z.email(),
  password: z.string().min(4, { message: "Password must be at least 4 characters long"}),
  confirm: z.string()
})
.refine((data) => data.password === data.confirm, {
  message: "Passwords don't match",
  path: ["confirm"]
});

export type RegisterUserInputs = z.infer<typeof registerUserSchema>;

export type PasswordData = {
    hash: string,
    salt: string,
    rounds: number, 
    hashingFunction: 'sha256'
};