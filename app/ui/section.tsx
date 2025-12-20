import React, { MouseEventHandler } from "react";
import Collapsible from "./collapsible";

export default function Section({ children, className, onClick, colorTheme = "bg-accent" }: {
        children: React.ReactNode,  
        className?: string, 
        onClick?: MouseEventHandler<HTMLElement>,
        colorTheme?: "bg-accent" | "bg-accent2"}) {
    return (
        <section 
            className={`flex ${colorTheme} rounded p-4 ${className ?? ""}`}
            onClick={onClick}>
            {children}
        </section>
    )
}

export function CollapsibleSection({ children, className }: { children: React.ReactNode, className?: string}) {
    return (
        <Collapsible>
            <Section className={className}>
                {children}
            </Section>
        </Collapsible>
    )
}