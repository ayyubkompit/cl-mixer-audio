import type { Metadata } from "next";
import { Bai_Jamjuree } from "next/font/google";
import "./globals.css";

const baiJamjuree = Bai_Jamjuree({
  weight: "700",
  subsets: ["latin"],
  variable: "--font-bai-jamjuree",
});

export const metadata: Metadata = {
  title: "Campus League Audio Mixer",
  description: "Campus League sound board",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${baiJamjuree.variable} h-full`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
