import Head from 'next/head'
import type {AppProps /*, AppContext */} from 'next/app';
import 'styles/globals.css'
import React from 'react';

function MyApp({Component, pageProps}:AppProps) {
    return (
        <>
            <Head>
                <title>我的博客</title>
                <link rel="icon" href="/favicon.ico"/>
                <meta name="viewport"
                      content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover"/>
                <link rel="stylesheet" href="hight"/>
            </Head>
            <Component {...pageProps} />
        </>
    )
}

export default MyApp
