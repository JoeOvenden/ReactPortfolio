import Gallery from "@/app/ui/gallery";
import Section from "@/app/ui/section";
import fs from 'fs';
import Image from "next/image";
import path from 'path';

export default function Page() {
    const avatarDir = path.join(process.cwd(), 'public/avatars/components');
    const eyesDir = path.join(avatarDir, "/eyes");
    const mouthsDir = path.join(avatarDir, "/mouths");
    const eyes = fs.readdirSync(eyesDir);
    const mouths = fs.readdirSync(mouthsDir);
    return (
        <div className="flex flex-row gap-4 items-center justify-center">
            <Gallery files={eyes} folder="/avatars/components/eyes/" />
            <Gallery files={mouths} folder="/avatars/components/mouths/" />
        </div>
    )
}