import {API} from "../../client/api";
import {CONFIG} from "../../client/config";

import Head from 'next/head'
import {Header} from "../../layouts";
import {FilterAttribute, ProductCard} from "../../components";
import {ProductList} from "../../containers";


export default function Home({topCategories, childTopCategoriesList, category, products, attributesList, pages}) {
    return (
        <>
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico"/>
                <link rel="preconnect" href="https://fonts.gstatic.com"/>
                <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600&display=swap"
                      rel="stylesheet"/>
            </Head>
            <Header topCategories={topCategories} childTopCategoriesList={childTopCategoriesList}/>

            <div className="wrapper">
                <section className="page-catalog">
                    <div className="content">
                        <h1 className="title">{category.name}</h1>
                        <div className="page-catalog_content">
                            <aside className="sidebar">
                                <div className="sidebar__wrapper">
                                    {attributesList.map(attribute => <FilterAttribute key={attribute.attribute.id} attribute={attribute} />)}
                                    <div className="button button_state-active">Применить</div>
                                </div>
                            </aside>

                            <div className="catalog">
                                <ProductList categoryID={category.id} initialProducts={products} pages={pages} />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>

    )
}


export async function getServerSideProps({params}) {
    const responseTopCategories = await fetch(process.env.APP_URL + API.TOP_CATEGORIES.url, {...API.TOP_CATEGORIES.options});
    const topCategories = await responseTopCategories.json();

    let childTopCategoriesList = [];

    for await (let topyCategory of topCategories.data) {
        const responseChildTopCategories = await fetch(process.env.APP_URL + API.CHILD_TOP_CATEGORIES.url + `&parent=${topyCategory.category.id}`, {...API.CHILD_TOP_CATEGORIES.options});
        const childTopCategories = await responseChildTopCategories.json();

        if (childTopCategories.data instanceof Array && childTopCategories.data.length > 0)
            childTopCategoriesList = [...childTopCategoriesList, ...childTopCategories.data];
    }

    const allCategories = [...childTopCategoriesList, ...topCategories.data];
    const currentCategory = allCategories.find(_category => _category.category.slug === params.slug);
    const responseProducts = await fetch(process.env.APP_URL + API.CATALOG_PRODUCTS.url + `&category=${currentCategory.category.id}` + `&per_page=${CONFIG.PRODUCTS_PER_PAGE}`, {...API.CATALOG_PRODUCTS.options});
    const products = await responseProducts.json();

    const responseAttributes = await fetch(process.env.APP_URL + API.ATTRIBUTES.url, {...API.ATTRIBUTES.options});
    const attributes = await responseAttributes.json();

    let attributesList = [];

    for await (let attribute of attributes.data) {
        const responseAttributeTerm = await fetch(process.env.APP_URL + API.ATTRIBUTE_TERMS.url + `&id=${attribute.attribute.id}`, {...API.ATTRIBUTE_TERMS.options});
        const attributeTerms = await responseAttributeTerm.json();

        if (attributeTerms.data instanceof Array && attributeTerms.data.length > 0) {
            let attributeWithTerms = {...attribute, terms: attributeTerms.data};
            attributesList = [...attributesList, attributeWithTerms];
        }
    }

    // const responseProductCount = await fetch(process.env.APP_URL + API.COUNT_PRODUCTS_IN_CATALOG.url + `&category=${currentCategory.category.id}`, {...API.COUNT_PRODUCTS_IN_CATALOG.options});
    // const productCount = await responseProductCount.json();
    // console.log(productCount)

    return {
        props: {
            topCategories: topCategories.data,
            childTopCategoriesList,
            category: currentCategory.category,
            products: products.data.products,
            attributesList,
            pages: products.data.pages
        }
    }
}
