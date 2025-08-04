import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Joe's Portfolio",
  description: "Web portfolio of Jonathan Ovenden",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased text-blue-500`}
      >
        {children}
      </body>
    </html>
  );
}
