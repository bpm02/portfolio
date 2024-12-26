"use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";


import Header from "./components/Header";

  const inter = Inter({ subsets: ["latin"] });

  // export const metadata: Metadata = {
  //   title: "Portfolio",
  //   description: "ハラダダイスケのポートフォリオ",
  // };

  export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {

  return (
    <html lang="ja">
      <body className={inter.className}>
        <div className="wrapper">
          <Header />
          {children}
          <footer className="footer"><small className="copy">© daisuke harada. 2024</small></footer>
        </div>
      </body>
    </html>
  );
}
