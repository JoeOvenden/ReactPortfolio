import { ReactNode } from "react";

export default function MainSection({ className = "", children } : {className?: string, children: React.ReactNode }) {
  return (
    <div className={`bg-black ${className}`}>
        {children}
    </div>
  );
}