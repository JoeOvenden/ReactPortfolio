import { auth } from '@/auth';
import { getUserByEmail } from './users';
import { AuthError } from 'next-auth';
import { sql } from './base';
import path from 'path';
import fs from 'fs';
import { User } from './definitions/User';

export async function ValidateLoggedInUser() {
    const user = await GetLoggedInUser();
    if (user == null) {
        throw new AuthError("User is anonymous");
    }

    return user as User;
}

export async function ValidateAdminUser() {
    const user = await GetLoggedInUser();
    if (!user?.is_admin) {
        throw new AuthError("Unauthorised access");
    }

    return user as User;
}

export async function GetLoggedInUser() {
    const session = await auth();
    if (session?.user?.email == null) {
        return null;
    }

    return await getUserByEmail(session?.user?.email ?? "");
}

export async function CreateAvatarComponenets() {
    await ValidateAdminUser();

    const avatarDir = path.join(process.cwd(), 'public/avatars/components');
    const eyesDir = path.join(avatarDir, "/eyes");
    const mouthsDir = path.join(avatarDir, "/mouths");
    const eyes = fs.readdirSync(eyesDir);
    const mouths = fs.readdirSync(mouthsDir);

    const existingFiles = (await sql<{ filename: string }[]>`SELECT filename FROM avatar_components;`).map(x => x.filename);
    const avatar_components = eyes.map(x => ({ filename: x.split(".")[0], type: "eyes"}))
        .concat(
            mouths.map(x => ({ filename: x.split(".")[0], type: "mouth"}))
        )
        .filter(x => !existingFiles.includes(x.filename));
    if (avatar_components.length == 0) {
        return;
    }

    await sql`INSERT INTO avatar_components ${sql(avatar_components)}
         ON CONFLICT DO NOTHING;`;
}

