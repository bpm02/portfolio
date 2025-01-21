import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";


import Header from "./components/Header";

// サーバーサイドでメタデータをエクスポート
export const metadata = {
  title: "ポートフォリオ",
  description: "ポートフォリオサイト",
  robots: {
    index: false, // noindexを指定
    follow: false, // nofollowを指定
  },
};

const inter = Inter({ subsets: ["latin"] });
  

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
          {/* <footer className="footer"><small className="copy">©. 2024</small></footer> */}
        </div>
      </body>
    </html>
  );
}
