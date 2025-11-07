"use client";

import { Avatar } from "@/app/ui/avatar";
import Gallery from "@/app/ui/gallery";
import Section from "@/app/ui/section";
import Image from "next/image";
import { useState } from "react";

export default function AvatarBuilder({ eyes, mouths} : {
    eyes: string[],
    mouths: string[]
}) {
    const galleryClasses = "flex flex-wrap gap-8 w-[50%] overflow-y-scroll h-[75vh]";
    const componentClasses = "cursor-pointer";
    const [userEyes, setEyes] = useState("");
    const [userMouth, setMouth] = useState("");
    return (
        <div className="flex flex-row gap-4 items-center justify-center">
            <Section className={galleryClasses}>
                {eyes.map(file => (
                    <Image 
                        alt={file}
                        src={`/avatars/components/eyes/${file}`}
                        width="200"
                        height="80"
                        onClick={() => setEyes(file)}
                        className={componentClasses}
                    />
                ))}
            </Section>
            <Section className={galleryClasses}>
                {mouths.map(file => (
                    <Image 
                        alt={file}
                        src={`/avatars/components/mouths/${file}`}
                        width="200"
                        height="80"
                        onClick={() => setMouth(file)}
                        className={componentClasses}
                    />
                ))}
            </Section>
            <Avatar eyes={userEyes} mouth={userMouth} size="large" />
        </div>
    )
}