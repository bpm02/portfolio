"use client";

import { useEffect, useState } from "react";
import { fetchPageData } from "./lib/services/userApi";
import { fadeElement } from "../app/lib/services/common";

import Link from "next/link";
import Image from "next/image";
import Script from "next/script";

import mv from "../../public/_mv/mv.jpg";



export default function Home() {

  const [pageData, setPageData] = useState(null);

  useEffect(() => {
    fetchPageData().then((data) => {
      const array = Object.entries(data.contents);
      setPageData(array)
      // console.log(array);
    });
    fadeElement();
  }, []);

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between">
        <div className="main-visual">

          <Image
            src={mv}
            width="1200"
            height="900"
            alt=""
            className="img img--mv absolute"
          />
          <div className="title-wrap">
            <h1 className="title title--site">Portfolio</h1>
          </div>
        </div>
      <div className="contents">

        <section id="portfolio" className="section section--portfolio js-target">
          <div className="section__inner w-11/12">
            <h2 className="title">Portfolio</h2>
            <div className="">
              <ul className="list list--portfolio grid">
                {pageData ? (pageData.map((item, index) => (
                  <li key={index} className="list__item">
                    <Link href={`post/${item[1]['id']}`} className="link link--portfolio relative flex items-center justify-center text-white aspect-square p-4" rel="nofollow">
                      <IsImage items={item[1]['thumbnail']} />
                      <div className="absolute flex flex-col items-center justify-center inset-0 w-11/12 text-center z-10 text-white m-auto">
                        <div className="text-sm">{item[1]['category']["name"]}</div>
                        <div className="font-bold">{item[1]['title']} 様</div>
                      </div>
                    </Link>
                  </li>
                ))) : (<li>Loding...</li>)}
              </ul>
            </div>
          </div>
        </section>
      </div>
      </main >
      </>
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