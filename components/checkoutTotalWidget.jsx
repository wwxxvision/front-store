import {Count} from "../client/utils";
import {calculateTotal} from "../client/shop/functions";

import {Button, Spinner} from "./index";


export default function CheckoutTotalWidget({btnTitle, clickAction, products, cartIsValide, pending = false, useButton = true}) {
    return <div className="checkout-price">
        <h2 className="checkout-price__title">Ваш заказ</h2>
        <div className="checkout-price__positions-list">
            <div className="checkout-price__position">
                <div className="name">Товары ({Count(products)})</div>
                <div className="price">{calculateTotal(products)} руб</div>
            </div>
        </div>

        <div className="checkout-price__total-line">
            <div className="name">Итого</div>
            <div className="price">{calculateTotal(products)} руб</div>
        </div>
        {!pending && useButton && <Button title={btnTitle} clickAction={clickAction} state={cartIsValide ? "active" : "disable"} />}
        {pending && <Spinner />}
    </div>
}
