import Link from 'next/link'
import { usePathname } from "next/navigation";
import { useState, useEffect } from 'react';



const Header = () => {

    const [navClass, setNavClass] = useState("");

    const pathname = usePathname();

    let rootURL = "";



    useEffect(() => {

        if (isHome(pathname)) {
            setNavClass("nav--home");
        } else {
            setNavClass("nav--page");
        }

        console.log(`navClass ${navClass}`);

        rootURL = getRootURL();

    }, [])

    const isHome = (path: string) => {
        return path === "/";
    };

    // 現在のルートURLを取得する関数
    const getRootURL = () => {
        if (typeof window !== "undefined") {
            // ブラウザ環境で取得
            return window.location.origin;
        } else {
            // サーバーサイドレンダリング中は空文字を返す
            return "";
        }
    };


    return (
        <nav className={`nav nav--main ${navClass} fixed z-10 w-full text-center`}>
            <ul className="list list--main-nav  flex justify-end  bg-transparent p-4 gap-3 ml-auto mr-0">
                <li className="list__item"><Link href={`${rootURL}#creator`} className="link">製作者</Link></li>
                <li className="list__item"><Link href={`${rootURL}#portfolio`} className="link">ポートフォリオ</Link></li>
            </ul>
        </nav>
    )
}

export default Header;