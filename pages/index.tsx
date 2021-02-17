import Head from 'next/head'
import {Header} from "../layouts";
import {API} from "../client/api";

export default function Home({topCategories, childTopCategoriesList}) {
    return (
        <>
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico"/>
                <link rel="preconnect" href="https://fonts.gstatic.com"/>
                <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600&display=swap"
                      rel="stylesheet"/>
            </Head>
            <Header topCategories={topCategories} childTopCategoriesList={childTopCategoriesList} />

        </>

    )
}


export async function getServerSideProps() {
    const responseTopCategories = await fetch(process.env.APP_URL + API.TOP_CATEGORIES.url, {...API.TOP_CATEGORIES.options})
    const topCategories = await responseTopCategories.json()

    let childTopCategoriesList = [];

    for await (let topyCategory of topCategories.data) {
        const responseChildTopCategories = await fetch(process.env.APP_URL + API.CHILD_TOP_CATEGORIES.url + `&parent=${topyCategory.category.id}`, {...API.CHILD_TOP_CATEGORIES.options});
        const childTopCategories = await responseChildTopCategories.json();

        if (childTopCategories.data instanceof  Array && childTopCategories.data.length > 0)
            childTopCategoriesList = [...childTopCategoriesList, ...childTopCategories.data];
    }


    return {props: {topCategories: topCategories.data, childTopCategoriesList}}
}
