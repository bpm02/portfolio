"use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { usePathname } from "next/navigation";
import Link from 'next/link'
import "./globals.css";

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

  const origin =
    typeof window !== "undefined" ? window.location.origin : "";

  const pathname = usePathname(); // 現在のパスを取得

  // ホームページかどうかを判定
  const isHome = pathname === "/";

  let rootURL = "";
  if (!isHome) {
    console.log(`root ${origin}`)
    rootURL = origin;
  }



  return (
    <html lang="ja">
      <body className={inter.className}>
        <div className="wrapper">
          <nav className="nav nav--main fixed z-10 w-full text-center">
            <ul className="list list--main-nav  flex justify-end  bg-transparent p-4 gap-3 ml-auto mr-0">
              <li className="list__item"><Link href={`${rootURL}#creator`} className="link">製作者</Link></li>
              <li className="list__item"><Link href={`${rootURL}#portfolio`} className="link">ポートフォリオ</Link></li>
            </ul>
          </nav>
          {children}
          <footer className="footer"><small className="copy">© daisuke harada. 2024</small></footer>
        </div>
      </body>
    </html>
  );
}
