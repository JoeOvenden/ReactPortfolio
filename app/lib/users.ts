'use server';

import { User } from './definitions/User';
import { sql } from './base';
import { GetLoggedInUser, ValidateAdminUser, ValidateLoggedInUser } from './admin';

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

export async function saveAvatar({ eyesFilename, mouthFilename, color} : {
    eyesFilename: string,
    mouthFilename: string,
    color: string
}) {
    const user = await ValidateLoggedInUser();
    
    color = color.replaceAll(/[^0-9A-Fa-f]/g, "");
    await sql`
    UPDATE users 
       SET avatar_colour = ${color},
           avatar_eyes = avatar_components.id
      FROM avatar_components
     WHERE users.id=${user.id}
      AND avatar_components.filename=${eyesFilename};`;
    console.log(eyesFilename, mouthFilename, color);
}