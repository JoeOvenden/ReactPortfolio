import fs from 'fs';
import path from 'path';
import AvatarBuilder from "./avatar-builder";
import { auth } from '@/auth';

export default async function Page() {
    const avatarDir = path.join(process.cwd(), 'public/avatars/components');
    const eyesDir = path.join(avatarDir, "/eyes");
    const mouthsDir = path.join(avatarDir, "/mouths");
    const eyes = fs.readdirSync(eyesDir);
    const mouths = fs.readdirSync(mouthsDir);
    const session = await auth();

    return <AvatarBuilder eyes={eyes} mouths={mouths} session={session}/>;
}