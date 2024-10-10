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
            console.log(array[7][1]);

        });


    }, []);

    const thumbUrl = pageData ? (pageData[7][1]) : ([]);


    return (
        <>
            <IsImage items={thumbUrl} />
            <h1>{pageData ? (pageData[5][1]) : (<p>loading...</p>)}</h1>
            <HTMLContentComponent pageData={pageData} />
        </>
    );
}

const IsImage = ({ items }) => {
    if (items.length === 0) {
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


const HTMLContentComponent = ({ pageData }) => {
    // pageDataが存在し、かつpageData[6][1]が存在するかを確認
    const htmlContent = pageData && pageData[6] && pageData[6][1] ? pageData[6][1] : null;

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