"use client";

import { useState } from "react"

export default function Collapsible({children} : { children: React.ReactNode }) {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <section 
            onClick={() => setCollapsed(!collapsed)}
        >
            {children} {collapsed ? "True" : "false"}
        </section>
    )
}