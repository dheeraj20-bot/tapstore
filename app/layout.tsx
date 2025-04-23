import type { Metadata } from "next";
import {Inter} from "next/font/google";
import "./globals.css";


const interFont = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
})


export const metadata: Metadata = {
  title: "Tap Store",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${interFont.className}  bg-gradient-to-br from-black to-gray-900 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
