import Head from "next/head";

export default function Page({children, title}) {
    return <>
        <Head>
            <title>{title}</title>
            <link rel="icon" href="/favicon.ico"/>
            <link rel="preconnect" href="https://fonts.gstatic.com"/>
            <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600&display=swap"
                  rel="stylesheet"/>
        </Head>
        {children}
    </>
}
