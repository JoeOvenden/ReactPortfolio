import { Avatar, AvatarProps } from "@/app/ui/avatar";
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
    const galleryClasses = "w-[50%] overflow-y-scroll h-[75vh]";
    const props : AvatarProps = {
        size: "medium",
        content: <p>TEST</p>
    };
    return (
        <div className="flex flex-row gap-4 items-center justify-center">
            <Gallery files={eyes} folder="/avatars/components/eyes/" className={galleryClasses} />
            <Gallery files={mouths} folder="/avatars/components/mouths/" className={galleryClasses} />
            <Avatar props={props}></Avatar>
        </div>
    )
}