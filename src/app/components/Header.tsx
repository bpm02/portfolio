"use client";

import Link from 'next/link'
import { usePathname } from "next/navigation";
import { useState, useEffect } from 'react';



const Header = () => {

    const [navClass, setNavClass] = useState("");
    const [rootURLText, setRootURLText] = useState("");

    const pathname = usePathname();

    let rootURL = "";



    useEffect(() => {

        if (isHome(pathname)) {
            setNavClass("nav--home");
        } else {
            setNavClass("nav--page");
        }

        setRootURLText(getBaseUrl());

        const handleScroll = () => {
            const header = document.querySelector(".nav--main");
            if (window.scrollY > 56) {
                header?.classList.add("fixed");
            } else {
                header?.classList.remove("fixed");
            }
        }

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };

    }, [])

    const isHome = (path: string) => {
        return path === "/";
    };

    // 現在のルートURLを取得する関数
    const getBaseUrl = () => {
        if (typeof window !== "undefined") {
            // クライアントサイドの場合
            const { protocol, host } = window.location;
            return `${protocol}//${host}`;
        } else {
            // サーバーサイドの場合
            if (!process.env.NEXT_PUBLIC_BASE_URL) {
                throw new Error("NEXT_PUBLIC_BASE_URLが環境変数に設定されていません。");
            }
            return process.env.NEXT_PUBLIC_BASE_URL;
        }
    };



    return (
        <nav className={`nav nav--main ${navClass} z-10 w-full text-center`}>
            <ul className="list list--main-nav  flex justify-end p-4 gap-3 ml-auto mr-0">
                <li className="list__item"><Link href={`${rootURLText}#portfolio`} className="link">ポートフォリオ</Link></li>
            </ul>
        </nav>
    )
}

export default Header;