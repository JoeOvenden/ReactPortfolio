"use client";

import Icon from "@mdi/react";
import Image from "next/image";
import { mdiAccount, mdiPencil } from '@mdi/js';
import Tooltip from "./tooltip";
import { request } from "http";
import { auth } from "@/auth";

// export interface AvatarProps {
//     src?: string,
//     alt?: string,
//     size: "small" | "medium" | "large",
//     content: React.ReactNode
// }

const defaultIfEmpty = (value : string | undefined, defaultValue: string) => {
    return value == "" || value == undefined ? defaultValue : value;
}

export function Avatar({ color = "#FFFF00", eyes, mouth, link, size = "medium"} : {
    color?: string,
    eyes?: string,
    mouth?: string,
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

    eyes = defaultIfEmpty(eyes, "smooth_big.svg");
    mouth = defaultIfEmpty(mouth, "smooth_D.svg");
    
    let dynamicClasses = "";
    if (link) dynamicClasses += " hover:cursor-pointer";
        
    return (
        <a href={link}>
            <div className={`${dynamicClasses} ${sizeClass} flex flex-col relative rounded-full border-2 border-(--color1) group`}
                style={{backgroundColor: color}}>
                <Image 
                    src={`/avatars/components/eyes/${eyes}`} 
                    alt="eyes"
                    width={componentSize}
                    height={componentSize}
                    className="absolute left-[50%] translate-x-[-50%] top-[30%] translate-y-[-50%]"
                />
                <Image 
                    src={`/avatars/components/mouths/${mouth}`} 
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