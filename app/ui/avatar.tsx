import Icon from "@mdi/react";
import Image from "next/image";
import { mdiAccount, mdiPencil } from '@mdi/js';
import Tooltip from "./tooltip";
import { request } from "http";
import { auth } from "@/auth";

export interface AvatarProps {
    src?: string,
    alt?: string,
    size: "small" | "medium" | "large",
    content: React.ReactNode
}

export async function Avatar({ props } : { props: AvatarProps }) {
    const sizeClasses = {
        small: "w-20 h-20",
        medium: "w-40 h-40",
        large: "w-60 h-60",
    };
    const sizeClass = sizeClasses[props.size];
    const transition = "transition-300 duration-300"
    const imageClasses = `${transition} transform hover:scale-96`;
    const session = await auth();
    return (
        <a href={`/runner/profile/${session?.user?.name}/avatar`}>
            <div className={`flex ${sizeClass} relative bg-accent2 rounded-full border-2 border-(--color1) p-3 group hover:cursor-pointer`}>
                <Tooltip label="HELLO">
                    {props.src == undefined || props.src === "" ?
                        <Icon path={mdiAccount} className={`${imageClasses}`}></Icon> :
                        <Image
                            className={`${imageClasses}`}
                            src={props.src}
                            width={100}
                            height={100}
                            alt={props.alt ?? "avatar"}
                        />
                    }
                </Tooltip>
                {props.content}
            </div>
        </a>
    )
}

export interface AvatarExtendedProps extends AvatarProps {
    username: string
}

export function AvatarExtended({ props } : { props: AvatarExtendedProps }) {
    return (
        <div className={`inline-flex flex-col`}>
            <Avatar props={props}></Avatar>
            <h1 className="m-2 text-xl">{props.username}</h1>
        </div>
    )
}