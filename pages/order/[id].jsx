import {
    fetchOrder
} from "../../client/fetch";
import {CONFIG} from '../../client/config';
import {SubscribeWithStore} from "../../client/subscribe";
import {useState} from "react";
import {getTitleOrderStatus} from '../../client/shop/functions';
const classNames = require('classnames');

import {Header, Page} from "../../layouts";
import {Spinner, ModalReturnOrder, CheckoutTotalWidget, Menu, Button, TextArea} from "../../components";
import Footer from "../../layouts/footer";
import {useRouter} from "next/router";



export default function Order({order}) {
    const AppStore = SubscribeWithStore();
    const [returnOrderForm, openReturnOrderForm] = useState(false);
    const [reasonForReturn, serReasonForReturn] = useState('');
    const [isSubmitedReturnOrder, setSubmitReturnOrder] = useState(false);
    const router = useRouter();

    const handleTextArea = (e) => serReasonForReturn(e.target.value);
    const returnFormIsValide = reasonForReturn && reasonForReturn.length > 2;
    const sumbitReturn = () => {
        if (returnFormIsValide) {
            setSubmitReturnOrder(true);
        }
    }
    const canReturnOrder = order.status !== 'completed' && order.status !== 'cancelled';


    return <Page title={`Заказ №${order.id}`}>
        <Header topCategories={CONFIG.TOP_CATEGORIES} childTopCategoriesList={CONFIG.CATEGORIES}/>
        {AppStore.state.toggleMenu && <Menu/>}
        {isSubmitedReturnOrder && <ModalReturnOrder onClose={() => router.push('/')} />}
        <div className="wrapper">
            <section className="page-cart">

                <div className="content">
                    <h1 className="title">{!returnOrderForm ? `Заказ №${order.id}` : 'Оформление возврата'}</h1>

                    <div className="block block-order">
                        {!returnOrderForm &&
                        <>
                            <div className={classNames(['order-status', {'order-status_state-cancelled': order.status === 'cancelled', 'order-status_state-completed': order.status === 'completed'}])}>{getTitleOrderStatus(order.status)}</div>
                            <div className="product-ordered-list">
                                {order.line_items.map(item => <div className="product-ordered-list__item" key={item.id}>
                                    <div className="name">{item.name}</div>
                                    <div className="price">{item.price} руб</div>
                                </div>)}
                            </div>

                            <div className="button-list">
                                <Button state="active" title="Товарный чек"/>
                                {canReturnOrder && <Button clickAction={() => openReturnOrderForm(true)} state="active" rounded={true} title="Оформить возврат"/>}
                            </div>
                        </>
                        }
                        {returnOrderForm &&
                            <>
                            <div className="block">
                                <TextArea onChange={handleTextArea} label="Укажите причину возврата" />
                            </div>
                            <div className="button-list">
                                <Button clickAction={sumbitReturn} state={returnFormIsValide ? 'active': 'disable'} title="Отправить"/>
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


