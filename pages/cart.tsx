import {
    fetchChildTopCategories,
    fetchTopCategories
} from "../client/fetch";
// import {getCrumbs, getImageSrcById, getParentCategory, isSale} from "../../client/shop/functions";

import Head from 'next/head'
import {Header} from "../layouts";
import {useSubscribeOnCart} from "../client/subscribe";
import {Spinner, ProductCart, CheckoutTotalWidget} from "../components";

export default function Cart({topCategories, childTopCategoriesList}) {
    const [cart, isLoading] = useSubscribeOnCart();
    return <>
        <Head>
            <title>Корзина</title>
            <link rel="icon" href="/favicon.ico"/>
            <link rel="preconnect" href="https://fonts.gstatic.com"/>
            <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600&display=swap"
                  rel="stylesheet"/>
        </Head>
        <Header topCategories={topCategories} childTopCategoriesList={childTopCategoriesList}/>
        <div className="wrapper">
            <section className="page-cart">
                <div className="block">
                    {isLoading && <Spinner/>}
                    {!isLoading && cart  && cart.map(cartItem => <ProductCart key={cartItem.id} product={cartItem}/>)}
                </div>

                <div className="block">
                    <CheckoutTotalWidget products={cart} />
                </div>
            </section>
        </div>
    </>
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
