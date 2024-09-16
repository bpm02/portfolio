"use client";

import { useEffect, useState } from "react";
import { fetchPageData } from "../app/lib/services/userApi";
// import { Link } from "next/link";
import Image from "next/image";


export default function Home() {

  const [pageData, setPageData] = useState({});

  useEffect(() => {
    fetchPageData().then((data) => {
      setPageData(data)
      console.log(data);
    });
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <h1>Hello world!</h1>
        <ul>
          <li><a href=""></a></li>
          <li><a href=""></a></li>
          <li><a href=""></a></li>
        </ul>
      </div>
    </main>
  );
}
