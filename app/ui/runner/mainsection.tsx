import { ReactNode } from "react";
import Section from "../section";

export default function MainSection({ className = "", children } : {className?: string, children: React.ReactNode }) {
  return (
    <Section className={`${className}`}>
        {children}
    </Section>
  );
}