"use client";

import { useEffect, useState } from "react";
import { fetchPageData } from "./lib/services/userApi";

import Link from "next/link";
import Image from "next/image";


export default function Home() {

  const [pageData, setPageData] = useState(null);

  useEffect(() => {
    fetchPageData().then((data) => {
      const array = Object.entries(data.contents);
      setPageData(array)
      console.log(array);
    });
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <div className="profile grid gap-5">
          <div className="profile__text">
            <dl>
              <dt>原田 大介</dt>
              <dd>テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト</dd>
            </dl>
          </div>
          <div className="profile__image">
          </div>
        </div>
        <h1>ポートフォリオ</h1>
        <ul className="grid grid-cols-3 gap-3">
          {pageData ? (pageData.map((item, index) => (
            <li key={index}>
              <Link href={`post/${item[1]['id']}`} className="flex items-center justify-center bg-black text-white aspect-square p-4">
                <Image
                  src={item[1]['eyecatch']['url']}
                  width={item[1]['eyecatch']['width']}
                  height={item[1]['eyecatch']['height']}
                  alt="アイキャッチ画像"
                />
                {item[1]['title']}</Link>
            </li>
          ))) : (<li>Loding...</li>)}
        </ul>
      </div>
    </main >
  );
}
