import {Count} from "../client/utils";
import {calculateTotal} from "../client/shop/functions";
import {Button} from "./index";

export default function CheckoutTotalWidget({products}) {
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
        <Button title="Оформить заказ" state="active" />
    </div>
}
