"use client"

import Image from "next/image"
import Section from "./section"

export default function Gallery({files, folder} : {
    files: string[],
    folder: string
}) {
    return (
        <Section>
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