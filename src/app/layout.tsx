import type { Metadata } from "next";
import {Lexend} from "next/font/google";
import "./globals.css";

const lexend = Lexend({
  subsets: ["latin"],
  weight: ["400"],
});


export const metadata = {
  title: "Sarana-Prasarana",
  description: "Landing page sederhana untuk Sapras digital",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`bg-white text-gray-800 font-sans ${lexend.className} min-h-screen w-full sm:w-auto`}>{children}</body>
    </html>
  );
}

