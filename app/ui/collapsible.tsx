"use client";

import { useEffect, useRef, useState } from "react"
import { CollapsibleMainSection } from "./runner/mainsection";
import Section from "./section";

export default function Collapsible({children} : { children: React.ReactNode }) {
    const [isOpen, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    let height = isOpen ? 0 : ref.current?.getBoundingClientRect().height ?? 100;

    useEffect(() => {
        if (isOpen) height = ref.current?.getBoundingClientRect().height ?? 100;
        else height = 0;
    }, [isOpen]);
    const classes = "";
    return (
        <Section className="cursor-pointer" onClick={() => setOpen(!isOpen)}>
            <div className="cursor-pointer">
                ------
            </div>
            <div 
                className={`${classes} overflow-hidden`}
                style={{ maxHeight: `${height}px`, transition: "max-height 0.3s"}}
            >
                {children}
            </div>
        </Section>
    )
}