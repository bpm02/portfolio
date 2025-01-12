"use client";

import { useEffect, useState } from "react";
import { fetchPageData } from "../../lib/services/userApi";
import { usePathname } from 'next/navigation';
import Link from 'next/link'
import Image from "next/image";
import next from "next";
import localImage from "../../../../public/ico-new-window.svg";


export default function Home() {
    const [allPageData, setAllPageData] = useState(null);
    const [pageData, setPageData] = useState(null);
    const [prevPageData, setPrevPageData] = useState(null);
    const [nextPageData, setNextPageData] = useState(null);
    const urlPath = usePathname();


    useEffect(() => {
        const id = urlPath.replace('/post/', '');
        // console.log(`id: ${id}`);
        fetchPageData().then((data) => {
            const array = Object.entries(data.contents);
            let currentNum = -1;
            let prevNum = -1;
            let nextNum = -1;
            setAllPageData(array);
            // console.log(array);
            array.some((item) => {
                if (item[1]["id"] == id) {
                    setPageData(item[1]);
                    currentNum = item[0];
                    // console.log(`cuurent num ${currentNum}`)
                    prevNum = Number(currentNum) - 1;
                    nextNum = Number(currentNum) + 1;

                    if (array[prevNum]) {
                        setPrevPageData(array[prevNum][1]);
                        // console.log(`prev ${prevNum} : ${JSON.stringify(prevPageData)}`);
                    }

                    if (array[nextNum]) {
                        setNextPageData(array[nextNum][1]);
                        // console.log(`next ${nextNum} : ${JSON.stringify(nextPageData)}`);
                    }

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

    const { title, text, eyecatch, category, url, inChange, technology, overview, functions } = pageData ? GetContents(pageData) : {};
    const thumbUrl = eyecatch ? (eyecatch) : ([]);

    const contents = {
        "概要": overview,
        "担当": inChange,
        "使用技術": technology,
        "機能": technology,
    }

    return (
        <>
            <IsImage items={thumbUrl} uniqueClassName="thumbnail"/>
            <main className="page page--portfolio">
                <div className="page__inner">
                    <h1 className="title title--page">{title ? (title) : ""}</h1>
                    <dl className="post-meta">
                        {url && (
                            <>
                                <dt className="post-meta__title">URL</dt>
                                <dd className="post-meta__text">
                                    <Link href={url} className="link link--new-window" target="_blank">
                                        {url}
                                        <Image
                                            src={localImage}
                                            width="16"
                                            height="16"
                                            alt="外部リンクへ"
                                        />
                                    </Link>
                                </dd>
                            </>
                        )}

                        <MetaDescription title="概要" description={overview} />
                        <MetaDescription title="担当" description={inChange} />
                        <MetaDescription title="使用技術" description={technology} />
                        <MetaDescription title="機能" description={functions} />
                    </dl>
                    <HTMLContentComponent pageData={text} />
                </div>
            </main>
            <aside className="pager">
                <Pager pageData={prevPageData} direction={'prev'} />
                <Pager pageData={nextPageData} direction={'next'} />
            </aside>
        </>
    );
}


const MetaDescription = ({ title, description }) => {
    // 空文字、null、undefinedの場合は何も表示しない
    if (!description || description.trim() === '') {
        return null;
    }

    return (
        <>
            <dt className="post-meta__title">{title}</dt>
            <dd className="post-meta__text">{description}</dd>
        </>
    );
};


const IsImage = ({ items, uniqueClassName = "" }) => {
    console.log(`item ${items}`);
    if (!items || items.length === 0) {
        return null; // 空の配列なら何も返さない
    }
    
    const className = uniqueClassName ? `img img--${uniqueClassName}`: "img";

    return (
        <>
            <Image
                src={items['url']}
                width={items['width']}
                height={items['height']}
                alt=""
                className={className}
            />
        </>
    );
};

const GetContents = (array) => {
    console.log(`content ${JSON.stringify(array)}`);
    if (!array) {
        return null;
    }

    const title = array.title ? array.title : "";
    const text = array.content ? array.content : "";
    const eyecatch = array.thumbnail ? array.thumbnail : "";
    const category = array.category ? array.category : "";
    const url = array.url ? array.url : "";
    const inChange = array.inChange ? array.inChange : "";
    const technology = array.technology ? array.technology : "";
    const overview = array.overview ? array.overview : "";
    const functions = array.functions ? array.functions : "";

    return { title, text, eyecatch, category, url, inChange , technology, overview, functions }; // オブジェクトで返す
};


const HTMLContentComponent = ({ pageData }) => {
    const htmlContent = pageData ? pageData : null;

    return (
        <div>
            {/* htmlContentが存在する場合のみ、dangerouslySetInnerHTMLを使用 */}
            {htmlContent ? (
                <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
            ) : (
                <span></span>  // htmlContentが無い場合のフォールバック
            )}
        </div>
    );
};



const Pager = (props) => {


    if (props.pageData == null) {
        return;
    }
    return (
        <>
            <Link href={props.pageData.id ? props.pageData.id : ""} className={props.direction}>{props.pageData.title}</Link>
        </>
    )
}