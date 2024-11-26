"use client";

import { useEffect, useState } from "react";
import { fetchPageData } from "../../lib/services/userApi";
import { usePathname } from 'next/navigation';
import Link from 'next/link'
import Image from "next/image";


export default function Home() {
    const [allPageData, setAllPageData] = useState(null);
    const [pageData, setPageData] = useState(null);
    const urlPath = usePathname();

    useEffect(() => {
        const id = urlPath.replace('/post/', '');
        console.log(`id: ${id}`);
        fetchPageData().then((data) => {
            const array = Object.entries(data.contents);
            setAllPageData(array);

            array.some((item) => {
                if (item[1]["id"] == id) {
                    setPageData(item[1]);
                    // console.log(`true ${item[1]}`);
                    return true;
                }
            });
            // console.log(array)
        });


        // fetchPageData(id).then((data) => {
        //     const array = Object.entries(data);
        //     setPageData(array)
        //     console.log(array);
        // });


    }, []);

    const { title, text, eyecatch, category, url, inCharge, technology, overview } = pageData ? GetContents(pageData) : {};
    const thumbUrl = eyecatch ? (eyecatch) : ([]);

    return (
        <>
            <IsImage items={thumbUrl} />
            <main className="page page--portfolio">
                <div className="page__inner">
                    <h1 className="title title--page">{title ? (title) : ""}</h1>
                    <dl className="post-meta">
                        <dt className="post-meta__title">URL</dt>
                        <dd className="post-meta__text"><Link href={url ? (url) : ""} target="_blank">{url ? (url) : ""}</Link></dd>
                        <dt className="post-meta__title">概要</dt>
                        <dd className="post-meta__text">{overview ? (overview) : ""}</dd>
                        <dt className="post-meta__title">担当</dt>
                        <dd className="post-meta__text">{inCharge ? (inCharge) : ""}</dd>
                        <dt className="post-meta__title">使用技術</dt>
                        <dd className="post-meta__text">{technology ? (technology) : ""}</dd>
                    </dl>
                    <HTMLContentComponent pageData={text} />
                </div>
            </main>                
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
            />
        </>
    );
};

const GetContents = (array) => {
    console.log(`content ${JSON.stringify(array)}`);
    if (!array) {
        return null;
    }

    // if (!array || array.length === 0) {
    //     return null; // 空の配列やnullの場合は何も返さない
    // }

    const title = array.title ? array.title : "";
    const text = array.text ? array.text : "";
    const eyecatch = array.eyecatch ? array.eyecatch : "";
    const category = array.category ? array.category : "";
    const url = array.url ? array.url : "";
    const inCharge = array.inCharge ? array.inCharge : "";
    const technology = array.technology ? array.technology : "";
    const overview = array.overview ? array.overview : "";

    return { title, text, eyecatch, category, url, inCharge, technology, overview }; // オブジェクトで返す
};


const HTMLContentComponent = ({ pageData }) => {
    const htmlContent = pageData && pageData[1] ? pageData[1] : null;

    return (
        <div>
            {/* htmlContentが存在する場合のみ、dangerouslySetInnerHTMLを使用 */}
            {htmlContent ? (
                <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
            ) : (
                <div>データがありません。</div>  // htmlContentが無い場合のフォールバック
            )}
        </div>
    );
};