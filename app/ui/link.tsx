import Link, { LinkProps } from "next/link";
import { ReactNode } from "react";

interface NavbarLinkProps extends LinkProps { 
  className?: string;
  children: ReactNode;
}

export function TextLink({ className = "", children, ...props}: NavbarLinkProps) {
  return (
    <Link
      {...props}
      className={`font-semibold ${className}`}
    >
      {children}
    </Link>
  )
}

export function Clickable({ children, className } : {
  children: React.ReactNode,
  className?: string,
}) {
  return <button className={`hover:text-black transition duration-150 font-semibold cursor-pointer ${className ?? ""}`}>{children}</button>
}