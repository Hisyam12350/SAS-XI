import type { Metadata } from "next";
import {Kavivanar} from "next/font/google";
import "./globals.css";

const kavivanar = Kavivanar({
  weight: "400",
  subsets: ["latin"],
});

export const metadata = {
  title: "PerpustakaanKu",
  description: "Landing page sederhana untuk perpustakaan digital",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-800 font-sans">{children}</body>
    </html>
  );
}

