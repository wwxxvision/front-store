import {
    fetchChildTopCategories,
    fetchTopCategories,
    fetchMakeOrder
} from "../client/fetch";
import {Empty} from "../client/utils";
import {useState} from 'react';
import {allCartItemsOutOfStock, createDataOrder} from "../client/shop/functions";
import {useSubscribeOnCart, SubscribeWithStore} from "../client/subscribe";
import {Formik} from 'formik';
import * as Yup from 'yup';
import {MESSAGES} from "../client/messages";

import Head from 'next/head'
import {Header} from "../layouts";
import {Spinner, ProductCart, CheckoutTotalWidget, OrderForm, Menu, Modal} from "../components";
import Footer from "../layouts/footer";
import {useRouter} from "next/router";


const OrderSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Поле не должно содержать менее 2 символов')
        .max(50, 'Поле не должно содержать более 50 символов')
        .required('Обязательно для заполнения'),
    secondName: Yup.string()
        .min(2, 'Поле не должно содержать менее 2 символов')
        .max(50, 'Поле не должно содержать более 50 символов')
        .required('Обязательно для заполнения'),
    street: Yup.string()
        .min(2, 'Поле не должно содержать менее 2 символов')
        .max(50, 'Поле не должно содержать более 50 символов')
        .required('Обязательно для заполнения'),
    house: Yup.number()
        .integer('Поле  должно содержать только целые числа')
        .required('Обязательно для заполнения'),
    appartment: Yup.number()
        .integer('Поле  должно содержать только целые числа')
        .required('Обязательно для заполнения'),
    backSum: Yup.number()
        .integer('Поле  должно содержать только целые числа'),
    phone: Yup.string()
        .min(17, 'Номер телефона не валидный')
        .required('Обязательно для заполнения'),
});

export default function Cart({topCategories, childTopCategoriesList}) {
    const [cart, deleteProductFromCart, isLoading, clearCart] = useSubscribeOnCart();
    const [isCheckout, setCheckout] = useState(false);
    const [pendingOrderResult, setPendingOrderResult] = useState(false);
    const AppStore = SubscribeWithStore();
    const router = useRouter();

    const pageTitle = isCheckout ? 'Оформление заказ' : 'Корзина';
    const btnTitle = isCheckout ? 'Купить' : 'Оформление заказа';
    const cartIsValide = !Empty(cart) && !allCartItemsOutOfStock(cart);

    const checkout = () => {
        if (!cartIsValide) {
            return;
        }

        if (!isCheckout) {
            setCheckout(true);

            return;
        }
    }

    const makeOrder = (handleSubmit) => {
        handleSubmit();
    }

    const submitHandler = async (values, actions) => {
        if (cartIsValide) {
            setPendingOrderResult(true);

            const dataOrder = createDataOrder(cart, values);
            const order = await fetchMakeOrder(dataOrder);

            setPendingOrderResult(false);

            if (order.data.created) {
                clearCart();
                router.push('/order_status', {id: order.data.data.id})
            } else {

            }
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
        <Header topCategories={topCategories} childTopCategoriesList={childTopCategoriesList}/>
        {AppStore.state.toggleMenu && <Menu/>}
        <div className="wrapper">
            <section className="page-cart">
                <Formik
                    initialValues={{
                        name: '',
                        secondName: '',
                        street: '',
                        house: '',
                        appartment: '',
                        paymentmethod: 'online',
                        backSum: 1000,
                        phone: ''
                    }}
                    onSubmit={submitHandler}
                    validationSchema={OrderSchema}
                >
                    {({
                          values,
                          errors,
                          touched,
                          handleChange,
                          handleBlur,
                          handleSubmit,
                          isSubmitting,
                      }) => (
                        <>
                            <div className="content">
                                <h1 className="title">{pageTitle}</h1>
                                {!isCheckout &&
                                <div className="block">
                                    {isLoading && <div className="loader"><Spinner height={80} width={80}/></div>}
                                    {cart && cart.map(cartItem => <ProductCart
                                        deleteProductFromCart={deleteProductFromCart} key={cartItem.variantID}
                                        product={cartItem}/>)}
                                </div>
                                }
                                {isCheckout &&
                                <div className="block">
                                    <OrderForm values={values} errors={errors} handleChange={handleChange}
                                               handleBlur={handleBlur} touched={touched}
                                               deleteProductFromCart={deleteProductFromCart}
                                               cart={cart}/>
                                </div>
                                }
                            </div>

                            <div className="block">
                                {!isLoading &&
                                <>
                                    <CheckoutTotalWidget btnTitle={btnTitle}
                                                         pending={pendingOrderResult}
                                                         clickAction={!isCheckout ? checkout : () => makeOrder(handleSubmit)}
                                                         cartIsValide={cartIsValide} products={cart}/>
                                    <div className="block notify">
                                        {allCartItemsOutOfStock(cart) &&
                                        <div className="notify__message">{MESSAGES.CART_IS_EMPTY}</div>
                                        }
                                        {Empty(cart) &&
                                        <div
                                            className="notify__message">{MESSAGES.CART_HAS_ITEM_WHICH_OUT_OF_STOCK}</div>
                                        }
                                    </div>
                                </>
                                }
                            </div>
                        </>

                    )}
                </Formik>
            </section>
        </div>
        <Footer/>
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
