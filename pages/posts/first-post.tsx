import Link from 'next/link'
import {useCallback} from "react";
import Head from "next/head";

export default function X() {
    const clickMe = useCallback(() => {
        console.log('click Me!!!')
    }, [])
    return (
        <>
            <Head>
                <title>第一篇文章</title>
            </Head>
            <div>
                First Post
                <br/>
                <button onClick={clickMe}>Click Me</button>
                <hr/>
                回到首页 <Link href="/"><a>点击这里</a></Link>
            </div>

        </>
    );
}

