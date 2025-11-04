"use client"

import Image from "next/image"
import Section from "./section"

export default function Gallery({files, folder, className = ""} : {
    files: string[],
    folder: string,
    className?: string
}) {
    return (
        <Section className={`flex flex-wrap gap-8 ${className}`}>
            {files.map(file => (
                <Image 
                    alt={file}
                    src={`${folder}${file}`}
                    width="200"
                    height="80"
                />
            ))}
        </Section>
    )
}