'use server';

import { PasswordData, RegisterUserInputs, registerUserSchema, User, UserBasicDTO, UserBasicFields } from './definitions/User';
import { sql } from './base';
import { ValidateLoggedInUser } from './admin';
import AvatarComponents, { AvatarComponentsId } from '@/schemas/public/AvatarComponents';
import { AvatarMappings } from '../context/UserContext';
import { hashPassword } from './cryptography';
import z, { string } from 'zod';


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

export type SearchUsersResponse = {
    users: UserBasicDTO[],
    userCount: number,
    pages: number
}

const getUsersSchema = z.object({
    searchString: z.string(),
    page: z.coerce.number().int().gte(1)
});
type getUsersParameters = z.infer<typeof getUsersSchema>;

export async function getUsers(getUsersParameters : getUsersParameters)
: Promise<SearchUsersResponse> {
    try {        
        const { searchString, page } = getUsersSchema.parse(getUsersParameters);
        const whereClause = (s : string) => {
            return s?.length > 0 
                ? sql`WHERE NAME LIKE '%${s}%'` 
                : sql``;
        }
        const countData = await sql<Number[]>`SELECT COUNT(*) FROM users ${whereClause(searchString)};`;
        if (countData.length === 0) {
            return {
                userCount: 0,
                users: [],
                pages: 0
            };
        }
        
        const userCount = countData[0] as number;
        const pageSize = 24;
        const users = await sql<UserBasicDTO[]>`SELECT ${sql(UserBasicFields)} FROM users ${whereClause(searchString)} LIMIT ${pageSize};`;
        return {
            users: users,
            userCount: userCount,
            pages: Math.ceil(userCount / pageSize)
        };
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

export async function parsePasswordData(passwordData: string) {
    const parts = passwordData.split("$");
    const parsedData : PasswordData = {
        salt: parts[0],
        hash: parts[1],
        rounds: parseInt(parts[2]),
        hashingFunction: 'sha256'
    };
    return parsedData;
}

export async function createPasswordSaveData(password: string) {
    const userSalt = crypto.randomUUID();
    const rounds = 10000;
    const hashingFunction = 'sha256';
    const passwordHash = hashPassword(userSalt, password, rounds, hashingFunction);
    return `${userSalt}$${passwordHash}$${rounds}$${hashingFunction}`;
}

export async function registerUser(
  inputs: RegisterUserInputs
) {
    try {
        registerUserSchema.parse(inputs);
        const passwordToSave = await createPasswordSaveData(inputs.password);
        await sql`INSERT INTO users (email, name, password) VALUES
                        (${inputs.email}, ${inputs.username}, ${passwordToSave})`;
    } catch (error) {
        console.log(error);
        return "There was an error.";
    }
}