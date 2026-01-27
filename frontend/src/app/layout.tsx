import type { Metadata } from 'next'
import { Figtree } from 'next/font/google'
import Navbar from '@/components/Navbar/Navbar'
import Footer from '@/components/Footer/Footer'
import './globals.css'

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree", // optional but useful for Tailwind/custom CSS
  display: "swap",
})

export const metadata: Metadata = {
  title: "SUS UBC Shop",
  description: "UBC Science Undergraduate Society Merch Shop",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${figtree.variable} ${figtree.variable}`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
