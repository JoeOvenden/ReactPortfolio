'use server';

import postgres from 'postgres';
import User from '../../schemas/public/User';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function getUserByEmail(email: string): Promise<User | undefined> {
    try {
        const users = await sql<User[]>`SELECT * FROM "user" WHERE email=${email};`;
        return users[0];
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
    }
}

export async function getUserByName(name: string): Promise<User | undefined> {
    try {
        const users = await sql<User[]>`SELECT * FROM "user" WHERE name=${name};`;
        return users[0];
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
    }
}