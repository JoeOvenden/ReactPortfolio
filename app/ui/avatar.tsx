"use client";

import Image from "next/image";
import { useAvatarMappings } from "../context/UserContext";
import { AvatarComponentsId } from "@/schemas/public/AvatarComponents";
import { User } from "../lib/definitions/User";

const defaultIfEmpty = (value : string | undefined, defaultValue: string) => {
    return value == "" || value == undefined ? defaultValue : value;
}

export const defaultAvatarEyesId = 1;
export const defaultAvatarMouthId = "default.svg";
export const defaultAvatarColour = "FFFF00";

function ensureSvg (filename: string) {
    if (filename.split(".").length === 1) filename += ".svg";
    return filename;
}

export function Avatar({ user, eyeOverride, mouthOverride, colourOverride, link, size = "medium"} : {
    user: User,
    eyeOverride?: AvatarComponentsId,
    mouthOverride?: AvatarComponentsId,
    colourOverride?: string,
    link?: string,
    size?: "small" | "medium" | "large"
}) {
    const sizeClasses = {
        "small": "w-40 h-40",
        "medium": "w-60 h-60",
        "large": "w-80 h-80"
    };
    const sizeClass = sizeClasses[size];
    const componentSize =  parseInt(sizeClass.split(" ")[0].split("-")[1]) * 2.2;
    const avatarMappings = useAvatarMappings();

    let dynamicClasses = "";
    if (link) dynamicClasses += " hover:cursor-pointer";
        
    return (
        <a href={link}>
            <div className={`${dynamicClasses} ${sizeClass} flex flex-col relative rounded-full border-2 border-(--color1) group`}
                style={{backgroundColor: "#" + (colourOverride ?? user.avatar_colour)}}>
                <Image 
                    src={`/avatars/components/eyes/${avatarMappings[eyeOverride ?? user.avatar_eyes].filename}.svg`} 
                    alt="eyes"
                    width={componentSize}
                    height={componentSize}
                    className="absolute left-[50%] translate-x-[-50%] top-[30%] translate-y-[-50%]"
                />
                <Image 
                    src={`/avatars/components/mouths/${avatarMappings[mouthOverride ?? user.avatar_mouth].filename}.svg`} 
                    alt="mouth"
                    width={componentSize}
                    height={componentSize}
                    className="absolute left-[50%] translate-x-[-50%] top-[64%] translate-y-[-50%]"
                />
            </div>
        </a>
    )
}

// export async function AvatarOld({ props } : { props: AvatarProps }) {
//     const sizeClasses = {
//         small: "w-20 h-20",
//         medium: "w-40 h-40",
//         large: "w-60 h-60",
//     };
//     const sizeClass = sizeClasses[props.size];
//     const transition = "transition-300 duration-300"
//     const imageClasses = `${transition} transform hover:scale-96`;
//     const session = await auth();
//     return (
//         <a href={`/runner/profile/${session?.user?.name}/avatar`}>
//             <div className={`flex ${sizeClass} relative bg-accent2 rounded-full border-2 border-(--color1) p-3 group hover:cursor-pointer`}>
//                 <Tooltip label="HELLO">
//                     {props.src == undefined || props.src === "" ?
//                         <Icon path={mdiAccount} className={`${imageClasses}`}></Icon> :
//                         <Image
//                             className={`${imageClasses}`}
//                             src={props.src}
//                             width={100}
//                             height={100}
//                             alt={props.alt ?? "avatar"}
//                         />
//                     }
//                 </Tooltip>
//                 {props.content}
//             </div>
//         </a>
//     )
// }

// export interface AvatarExtendedProps extends AvatarProps {
//     username: string
// }

// export function AvatarExtended({ props } : { props: AvatarExtendedProps }) {
//     return (
//         <div className={`inline-flex flex-col`}>
//             <AvatarOld props={props}></AvatarOld>
//             <h1 className="m-2 text-xl">{props.username}</h1>
//         </div>
//     )
// }