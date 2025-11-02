import React from "react";
import Collapsible from "./collapsible";

export default function Section({ children, className }: { children: React.ReactNode, className?: string}) {
    return (
        <section className={`bg-accent rounded-xl p-4 ${className}`}>
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