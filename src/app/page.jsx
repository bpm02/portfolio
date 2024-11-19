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
                      <IsImage items={item[1]['eyecatch']} />
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


const IsImage = ({ items }) => {
  if (!items || items.length === 0) {
    return null; // 空の配列なら何も返さない
  }

  return (
    <>
      <Image
        src={items['url']}
        width={items['width']}
        height={items['height']}
        alt=""
        className="absolute inset-0 aspect-square m-auto brightness-50"
      />
    </>
  );
};