import {
    fetchChildTopCategories,
    fetchTopCategories
} from "../client/fetch";
import {Empty} from "../client/utils";
import {useState} from 'react';

import Head from 'next/head'
import {Header} from "../layouts";
import {useSubscribeOnCart} from "../client/subscribe";
import {Spinner, ProductCart, CheckoutTotalWidget, OrderForm} from "../components";



export default function Cart({topCategories, childTopCategoriesList}) {
    const [cart, deleteProductFromCart, isLoading] = useSubscribeOnCart();
    const [isCheckout, setCheckout] = useState(false);

    const pageTitle = isCheckout ? 'Оформление заказ' : 'Корзина';
    const btnTitle = isCheckout ? 'Купить' : 'Оформление заказ';
    const cartIsValide = !Empty(cart);

    const checkout = () => {
        if (!cartIsValide) {
            return;
        }

        if (!isCheckout) {
            setCheckout(true);

            return;
        }
    }

    return <>
        <Head>
            <title>{pageTitle}</title>
            <link rel="icon" href="/favicon.ico"/>
            <link rel="preconnect" href="https://fonts.gstatic.com"/>
            <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600&display=swap"
                  rel="stylesheet"/>
        </Head>
        <Header topCategories={topCategories} childTopCategoriesList={childTopCategoriesList}
                hasItemInCart={!Empty(cart)}/>
        <div className="wrapper">
            <section className="page-cart">
                <div className="content">
                    <h1 className="title">{pageTitle}</h1>
                    {!isCheckout &&
                    <div className="block">
                        {isLoading && <Spinner/>}
                        {!isLoading && cart && cart.map(cartItem => <ProductCart
                            deleteProductFromCart={deleteProductFromCart} key={cartItem.id} product={cartItem}/>)}
                    </div>
                    }
                    {isCheckout &&
                        <div className="block">
                          <OrderForm  deleteProductFromCart={deleteProductFromCart}  cart={cart} />
                        </div>
                    }
                </div>

                <div className="block">
                    <CheckoutTotalWidget btnTitle={btnTitle} clickAction={checkout} cartIsValide={cartIsValide} products={cart}/>
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
