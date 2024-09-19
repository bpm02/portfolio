"use client";

import { useEffect, useState } from "react";
import { fetchPageData } from "../../lib/services/userApi";
import { usePathname } from 'next/navigation';


export default function Home() {

    const [pageData, setPageData] = useState(null);
    const urlPath = usePathname();

    console.log(`urlPath: ${urlPath}`);


    useEffect(() => {

        const id = urlPath.replace('/post/', '');

        fetchPageData(id).then((data) => {
            const array = Object.entries(data);
            setPageData(array)
            console.log(array);
        });
    }, []);


    return (
        <>
            <h1>{pageData ? (pageData[5][1]) : (<p>loading...</p>)}</h1>
            <div className="main">
                {pageData ? (pageData[6][1]) : (<p>loading...</p>)}
            </div>
        </>
    );
}