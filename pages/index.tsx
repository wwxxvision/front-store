import Head from 'next/head'
import {fetchChildTopCategories, fetchTopCategories} from "../client/fetch";

import {Header} from "../layouts";
import {News} from '../components';

export default function Home({topCategories, childTopCategoriesList}) {
    return (
        <>
            <Head>
                <title>Магазин одежды</title>
                <link rel="icon" href="/favicon.ico"/>
                <link rel="preconnect" href="https://fonts.gstatic.com"/>
                <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600&display=swap"
                      rel="stylesheet"/>
            </Head>
            <Header topCategories={topCategories} childTopCategoriesList={childTopCategoriesList}/>
            <News/>
        </>

    )
}


export async function getServerSideProps() {
    const topCategories = await fetchTopCategories();
    const childTopCategoriesList = await fetchChildTopCategories(topCategories);

    return {
        props: {
            topCategories: topCategories,
            childTopCategoriesList,
        }
    }
}
