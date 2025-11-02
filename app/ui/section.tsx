import React, { MouseEventHandler } from "react";
import Collapsible from "./collapsible";

export default function Section({ children, className, onClick }: {
        children: React.ReactNode,  
        className?: string, 
        onClick?: MouseEventHandler<HTMLElement>}) {
    return (
        <section 
            className={`bg-accent rounded-xl p-4 ${className ?? ""}`}
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