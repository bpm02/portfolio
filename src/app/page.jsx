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
            <h1 className="title title--site">Daisuke Harada's<br></br>Portfolio</h1>
          </div>
        </div>
      <div className="contents">

        <section id="creator" className="profile section section--profile slant-bg">
          <div className="section__inner items-center w-11/12">
            <div className="content grid gap-5">
              <div className="profile__text js-target fade-left">
                <dl className="career">
                <dt><ruby>原田 大介<rp>(</rp><rt>ハラダ  ダイスケ</rt><rp>)</rp></ruby></dt>
                <dd>
                    <p>20代はネット回線等の訪問営業。 30代から学生自体に身に着けた
                      デザインと、自主的に身に着けていた WEBスキルでフリーランスとし
                      て活動。</p>
                    <p>中小企業のコーポレートサイトの作成や、 WEBサイトの運営のアドバ
                      イス。チラシ作りや、 WEB広告代行などを行う。</p>
                </dd>
              </dl>
            </div>
            <div className="profile__image js-target">
            </div>
            </div>
          </div>
        </section>

        <section id="skill" className="section section--skill js-target">
          <div className="section__inner w-11/12">
            <h3 className="title">スキル</h3>
            <ul className="list list--skill">
              <li className="list__item">基礎コンピュータサイエンスの知識</li>
              <li className="list__item">JavaScript・PHP・Python・MQLのプログラミング</li>
              <li className="list__item">基礎ネットワークの知識</li>
              <li className="list__item">WordPressのカスタマイズ</li>
              <li className="list__item">簡単なデータベース設計</li>
              <li className="list__item">Adobe Illustrator Photoshopによるデザイン</li>
            </ul>
          </div>
        </section>

        <section id="portfolio" className="section section--portfolio js-target">
          <div className="section__inner w-11/12">
            <h2 className="title">Portfolio</h2>
            <div className="">
              <ul className="list list--portfolio grid">
                {pageData ? (pageData.map((item, index) => (
                  <li key={index} className="list__item">
                    <Link href={`post/${item[1]['id']}`} className="link link--portfolio relative flex items-center justify-center text-white aspect-square p-4">
                      <IsImage items={item[1]['eyecatch']} />
                      <span className="absolute top-1/2 w-11/12 text-center z-10 m-auto text-white">{item[1]['title']} 様</span></Link>
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