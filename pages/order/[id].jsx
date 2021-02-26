import {
    fetchOrder
} from "../../client/fetch";
import {CONFIG} from '../../client/config';
import {SubscribeWithStore} from "../../client/subscribe";
import {Formik} from 'formik';
import {useState} from "react";

import {Header, Page} from "../../layouts";
import {Spinner, ProductCart, CheckoutTotalWidget, Menu, Button} from "../../components";
import Footer from "../../layouts/footer";


export default function Order({order}) {
    const AppStore = SubscribeWithStore();
    const [returnOrderForm, openReturnOrderForm] = useState(false);


    return <Page title={`Заказ №${order.id}`}>
        <Header topCategories={CONFIG.TOP_CATEGORIES} childTopCategoriesList={CONFIG.CATEGORIES}/>
        {AppStore.state.toggleMenu && <Menu/>}
        <div className="wrapper">
            <section className="page-cart">

                <div className="content">
                    <h1 className="title">{!returnOrderForm ? `Заказ №${order.id}` : 'Оформление возврата'}</h1>

                    <div className="block block-order">
                        {!returnOrderForm &&
                        <>
                            <div className="product-ordered-list">
                                {order.line_items.map(item => <div className="product-ordered-list__item" key={item.id}>
                                    <div className="name">{item.name}</div>
                                    <div className="price">{item.price} руб</div>
                                </div>)}
                            </div>

                            <div className="button-list">
                                <Button state="active" title="Товарный чек"/>
                                <Button clickAction={() => openReturnOrderForm(true)} state="active" rounded={true} title="Оформить возврат"/>
                            </div>
                        </>
                        }
                        {returnOrderForm &&
                            <>
                            <div className="block">

                            </div>
                            <div className="button-list">
                                <Button state="active" title="Отправить"/>
                                <Button clickAction={() => openReturnOrderForm(false)} state="active" rounded={true} title="Назад"/>
                            </div>
                            </>
                        }
                    </div>
                </div>

                <div className="block">
                    <CheckoutTotalWidget useButton={false}
                                         cartIsValide={false} products={order.line_items}/>
                    <div className="block notify">

                    </div>
                </div>
            </section>
        </div>
        <Footer/>
    </Page>
}

export async function getServerSideProps({params}) {
    const order = await fetchOrder(params.id);
    if (!order) {
        return {
            notFound: true
        }
    }
    return {
        props: {
            order: order.data
        }
    }
}


