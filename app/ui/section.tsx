import React from "react";

export default function Section({ children, className }: { children: React.ReactNode, className?: string}) {
    return (
        <section className={`bg-accent rounded-xl p-4 ${className}`}>
            {children}
        </section>
    )
}