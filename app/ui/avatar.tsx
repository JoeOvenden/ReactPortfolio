"use client";

import Image from "next/image";
import { useAvatarMappings } from "../context/UserContext";
import { AvatarComponentsId } from "@/schemas/public/AvatarComponents";
import { User, UserBasicDTO } from "../lib/definitions/User";
import { clickableClasses } from "./global-styles";

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

export function UserCard({ user, link, size = "medium"} : {
    user: User | UserBasicDTO,
    link?: string,
    size?: "small" | "medium" | "large"
}) {
    return <div className="flex flex-col items-center gap-4">
        <Avatar
                eyesId={user.avatar_eyes}
                mouthId={user.avatar_mouth}
                colour={user.avatar_colour}
                link={link}
                size={size} 
            />
        <h1 className="text-2xl">{user.name}</h1>
    </div>
}

export function Avatar({ eyesId, mouthId, colour, link, size = "medium"} : {
    eyesId: AvatarComponentsId,
    mouthId: AvatarComponentsId,
    colour: string,
    link?: string,
    size?: "small" | "medium" | "large"
}) {
    colour = colour.replace("#", "");
    const sizeClasses = {
        "small": "w-40 h-40",
        "medium": "w-60 h-60",
        "large": "w-80 h-80"
    };
    const sizeClass = sizeClasses[size];
    const componentSize =  parseInt(sizeClass.split(" ")[0].split("-")[1]) * 2.2;
    const avatarMappings = useAvatarMappings();

    let dynamicClasses = "";
    if (link) dynamicClasses += clickableClasses;
        
    return (
        <a href={link}>
            <div className={`${dynamicClasses} ${sizeClass} flex flex-col relative rounded-full border-2 border-(--color1) group`}
                style={{backgroundColor: "#" + (colour)}}>
                <Image 
                    src={`/avatars/components/eyes/${avatarMappings[eyesId].filename}.svg`} 
                    alt="eyes"
                    width={componentSize}
                    height={componentSize}
                    className="absolute left-[50%] translate-x-[-50%] top-[30%] translate-y-[-50%]"
                />
                <Image 
                    src={`/avatars/components/mouths/${avatarMappings[mouthId].filename}.svg`} 
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