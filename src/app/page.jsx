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
    <main className="flex min-h-screen flex-col items-center justify-between">
      <nav className="nav nav--main fixed z-10 w-full text-center">
        <ul className="list list--main-nav  flex justify-end  bg-transparent p-4 gap-3 ml-auto mr-0">
          <li className="list__item"><a href="#creator" className="link">製作者</a></li>
          <li className="list__item"><a href="#portfolio" className="link">ポートフォリオ</a></li>
        </ul>
      </nav>
      <div className="main-visual">
        <div className="title-wrap">
          <h1 className="title title--site">Daisuke Harada's<br></br>Portfolio</h1>
        </div>
      </div>
      <div className="contents">

        <section id="creator" className="profile section slant-bg">
          <div className="section__inner grid gap-5 items-center w-11/12">
            <div className="profile__text">
              <dl className="">
                <dt><ruby>原田 大介<rp>(</rp><rt>ハラダ　ダイスケ</rt><rp>)</rp></ruby></dt>
                <dd>
                  <p>テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト</p>
                </dd>
              </dl>
            </div>
            <div className="profile__image">
            </div>
          </div>
        </section>

        <section id="portfolio" className="section">
          <div className="section__inner w-11/12">
            <h2 className="title">Portfolio</h2>
            <div className="">
              <ul className="list list--portfolio grid grid-cols-3 gap-3">
                {pageData ? (pageData.map((item, index) => (
                  <li key={index} className="list__item">
                    <Link href={`post/${item[1]['id']}`} className="link link--portfolio relative flex items-center justify-center text-white aspect-square p-4">
                      <Image
                        src={item[1]['eyecatch']['url']}
                        width={item[1]['eyecatch']['width']}
                        height={item[1]['eyecatch']['height']}
                        alt="アイキャッチ画像"
                        className="absolute inset-0 aspect-square m-auto brightness-50"
                      />
                      <span className="absolute top-1/2 w-11/12 text-center z-10 m-auto text-white">{item[1]['title']}</span></Link>
                  </li>
                ))) : (<li>Loding...</li>)}
              </ul>
            </div>
          </div>
        </section>
      </div>
    </main >
  );
}
