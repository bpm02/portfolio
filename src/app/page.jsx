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
        <h1>Hello world!</h1>
        <ul>
          {pageData ? (pageData.map((item, index) => (
            <li key={index}><Link href={`post/${item[1]['id']}`}> {item[1]['title']}</Link></li>
          ))) : (<li>Loding...</li>)}
        </ul>
      </div>
    </main >
  );
}
