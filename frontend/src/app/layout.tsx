import type { Metadata } from "next";
import { Figtree } from "next/font/google"
import "./globals.css";

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree", // optional but useful for Tailwind/custom CSS
  display: "swap",
})

export const metadata: Metadata = {
  title: "SUS UBC Shop",
  description: "UBC Science Undergraduate Society Merch Shop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${figtree.variable} ${figtree.variable}`}>
        {children}
      </body>
    </html>
  );
}
