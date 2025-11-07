"use client";

import { Avatar } from "@/app/ui/avatar";
import Button from "@/app/ui/button";
import Gallery from "@/app/ui/gallery";
import Section from "@/app/ui/section";
import Icon from "@mdi/react";
import Image from "next/image";
import { useState } from "react";

export default function AvatarBuilder({ eyes, mouths} : {
    eyes: string[],
    mouths: string[]
}) {
    const galleryClasses = "flex flex-wrap gap-8 overflow-y-scroll max-h-[70vh]";
    const componentClasses = "cursor-pointer transition duration-300 hover:scale-90";
    const [avatarEyes, setEyes] = useState("");
    const [avatarMouth, setMouth] = useState("");
    const [avatarColour, setColour] = useState("");
    return (
        <div className="grid grid-cols-3 gap-4 container">
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
            <Section className="flex flex-col gap-10 items-center justify-center">
                <Avatar eyes={avatarEyes} mouth={avatarMouth} color={avatarColour} size="large" />
                <div className="flex flex-col gap-1">
                    <div className="flex gap-4">
                        <label>Colour:</label>
                        <input type="color" onChange={(e) => setColour(e.target.value)}/>
                    </div>
                    <Button>Save</Button>
                </div>
            </Section>
        </div>
    )
}