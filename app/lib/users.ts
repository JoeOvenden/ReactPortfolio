'use server';

import { User, UserBasicDTO, UserBasicFields } from './definitions/User';
import { sql } from './base';
import { ValidateLoggedInUser } from './admin';
import AvatarComponents, { AvatarComponentsId } from '@/schemas/public/AvatarComponents';
import { AvatarMappings } from '../context/UserContext';
import bcrypt from 'bcrypt';

export async function getUserByEmail(email: string): Promise<User | undefined> {
    try {
        const users = await sql<User[]>`SELECT * FROM users WHERE email=${email};`;
        return users[0];
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
    }
}

export async function getUserByName(name: string): Promise<User | undefined> {
    try {
        const users = await sql<User[]>`SELECT * FROM users WHERE name=${name};`;
        return users[0];
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
    }
}

export async function getUsers(): Promise<UserBasicDTO[]> {
    try {        
        const users = await sql<UserBasicDTO[]>`SELECT ${sql(UserBasicFields)} FROM users LIMIT 100;`;
        return users;
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
    }
}

export async function getAvatarComponentsInfo() {
    const array = (await sql<AvatarComponents[]>`SELECT * FROM avatar_components;`) as AvatarComponents[];
    const mappings: AvatarMappings = {};
    array.forEach(x => {
        mappings[x.id] = {
            filename: x.filename,
            type: x.type
        }
    })
    return { array, mappings };
}

export async function saveAvatar({ eyesId, mouthId, color} : {
    eyesId: AvatarComponentsId,
    mouthId: AvatarComponentsId,
    color: string
}) {
    const user = await ValidateLoggedInUser();
    
    color = color.replaceAll(/[^0-9A-Fa-f]/g, "");
    await sql`
    UPDATE users
       SET avatar_colour = ${color},
           avatar_eyes = ${eyesId},
           avatar_mouth = ${mouthId}
     WHERE id=${user.id};`;
}

export async function register(
  prevState: string | undefined,
  formData: FormData
) {
    const password = formData.get("password")?.toString() ?? ""; 
    const name = formData.get("username")?.toString() ?? ""; 
    const email = formData.get("email")?.toString() ?? ""; 
    const passwordHash = await bcrypt.hash(formData.get("password")?.toString() ?? "", 10);
  try {
    await sql`INSERT INTO users (email, name, password) VALUES
                    (${email}, ${name}, ${passwordHash})`;
  } catch (error) {
    console.log(error);
    return "There was an error.";
  }
}