import React, {useEffect} from 'react';
import {
    fetchAttributes,
    fetchAttributeTerms,
    fetchChildTopCategories,
    fetchProducts,
    fetchTopCategories
} from "../../client/fetch";
import {getCurrentCategoryBySlug, getCrumbs} from "../../client/shop/functions";
import {
    SubscribeWithStore,
    SubscribeOnProductsFilter,
    SubscribeOnProductsPagPage,
    useSubscribeOnCart
} from "../../client/subscribe"
import {Empty} from "../../client/utils";

import Head from 'next/head'
import {Header} from "../../layouts";
import {ProductList, FilterList} from "../../containers";
import {BreadCrumb, Menu} from "../../components";
import Footer from "../../layouts/footer";


export default function Catalog({topCategories, childTopCategoriesList, category, products, attributesList, pages, allCategories}) {
    const AppStore = SubscribeWithStore();

    useEffect(() => {
        AppStore.dispatch({type: "UPDATE_CATALOG_PRODUCTS", products: products});
        AppStore.dispatch({type: "UPDATE_CATEGORY_ID", categoryID: category.id});
        AppStore.dispatch({type: "UPDATE_PAG_PAGES", pages: pages});
    }, []);

    SubscribeOnProductsFilter(AppStore.state, AppStore.dispatch);
    SubscribeOnProductsPagPage(AppStore.state, AppStore.dispatch);
    useSubscribeOnCart(false);

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
            {AppStore.state.toggleMenu && <Menu/>}
            <div className="wrapper">
                <section className="page-catalog">
                    <div className="content">
                        <BreadCrumb breadcrumb={getCrumbs(category, allCategories)}/>
                        <h1 className="title">{category.name}</h1>
                        <div className="page-catalog_content">
                            <aside className="sidebar">
                                <div className="sidebar__wrapper">
                                    <FilterList attributesList={attributesList} categoryID={category.id}/>
                                </div>
                            </aside>

                            <div className="catalog">
                                {!Empty(AppStore.state.products) &&
                                <ProductList products={AppStore.state.products}/>}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer/>
        </>

    )
}


export async function getServerSideProps({params}) {
    const topCategories = await fetchTopCategories();
    const childTopCategoriesList = await fetchChildTopCategories(topCategories);
    const allCategories = [...childTopCategoriesList, ...topCategories];
    const currentCategory = getCurrentCategoryBySlug(allCategories, params.slug);
    const products = await fetchProducts(currentCategory.id);
    const attributes = await fetchAttributes();
    const attributesList = await fetchAttributeTerms(attributes);

    return {
        props: {
            topCategories: topCategories,
            childTopCategoriesList,
            category: currentCategory,
            products: products.data,
            attributesList,
            pages: products.pages,
            allCategories,
        }
    }
}
