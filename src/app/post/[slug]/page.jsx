"use client";

import { useEffect, useState } from "react";
import { fetchPageData } from "../../lib/services/userApi";
import { usePathname } from 'next/navigation';
import Image from "next/image";


export default function Home() {

    const [pageData, setPageData] = useState(null);
    const urlPath = usePathname();

    useEffect(() => {
        const id = urlPath.replace('/post/', '');

        fetchPageData(id).then((data) => {
            const array = Object.entries(data);
            setPageData(array)
            console.log(array);

        });


    }, []);

    const { title, text, eyecatch, technology, overview } = pageData ? GetContents(pageData) : {};
    const thumbUrl = eyecatch ? (eyecatch[1]) : ([]);

    return (
        <>
            <IsImage items={thumbUrl} />
            <main className="page page--portfolio">
                <div className="page__inner">
                    <h1 className="title title--page">{title ? (title[1]) : ""}</h1>
                    <dl className="post-meta">
                        <dt className="post-meta__title">概要</dt>
                        <dd className="post-meta__text">{overview ? (overview[1]) : ""}</dd>
                        <dt className="post-meta__title">使用技術</dt>
                        <dd className="post-meta__text">{technology ? (technology[1]) : ""}</dd>
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
    if (!array || array.length === 0) {
        return null; // 空の配列やnullの場合は何も返さない
    }

    const title = array[5];
    const text = array[6];
    const eyecatch = array[7];
    const technology = array[9];
    const overview = array[10];

    return { title, text, eyecatch, technology, overview }; // オブジェクトで返す
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