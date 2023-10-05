import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PauloZap",
  description: "ZapZap do Venones",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="bg-slate-950" lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
