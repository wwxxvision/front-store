import {Input, ProductCart, Radio} from "./index";


export default function OrderForm({deleteProductFromCart, cart, values, errors, touched, handleChange, handleBlur}) {
    return <form className="form form-order">
        <div className="form__title">
            Адрес доставки
        </div>

        <div className="form__group">
            <div className="form__row">
                <Input type="text" label="Имя" name="name" onChange={handleChange} onBlur={handleBlur}
                       value={values.name}/>
                {errors.name && touched.name ? (
                    <div className="form__errors">{errors.name}</div>
                ) : null}
            </div>


            <div className="form__row">
                <Input type="text" label="Фамилия" name="secondName" onBlur={handleBlur} onChange={handleChange}
                       value={values.secondName}/>
                {errors.secondName && touched.secondName ? (
                    <div className="form__errors">{errors.secondName}</div>
                ) : null}
            </div>
        </div>

        <div className="form__group form__group_columns-3">

            <div className="form__row">
                <Input type="text" label="Улица" name="street" onBlur={handleBlur} onChange={handleChange}
                       value={values.street}/>
                {errors.street && touched.street ? (
                    <div className="form__errors">{errors.street}</div>
                ) : null}
            </div>

            <div className="form__row">
                <Input type="text" label="Дом" name="house" onBlur={handleBlur} onChange={handleChange}
                       value={values.house}/>
                {errors.house && touched.house ? (
                    <div className="form__errors">{errors.house}</div>
                ) : null}
            </div>

            <div className="form__row">
                <Input type="text" label="Квартира" name="appartment" onBlur={handleBlur}
                       onChange={handleChange} value={values.appartment}/>
                {errors.appartment && touched.appartment ? (
                    <div className="form__errors">{errors.appartment}</div>
                ) : null}
            </div>
        </div>

        <div className="form__row">
            <Input type="tel" label="Номер телефона" name="phone" onBlur={handleBlur} onChange={handleChange}
                   value={values.phone}/>
            {errors.phone && touched.phone ? (
                <div className="form__errors">{errors.phone}</div>
            ) : null}
        </div>


        <div className="form__title">
            Способ оплаты
        </div>

        <div className="form__row">
            <div className="form__line">
                <Radio value="online" label="Онлайн картой" name="paymentmethod"/>
                <Radio value="cod" label="Наличными курьеру" name="paymentmethod"/>
            </div>
        </div>

        {values.paymentmethod === 'cod' &&
        <>
            <div className="form__title">
                Сдача
            </div>

            <div className="form__row">
                <Input type="text" label="Нужна сдача с" name="backSum" onBlur={handleBlur}
                       onChange={handleChange} value={values.backSum}/>

                {errors.backSum && touched.backSum ? (
                    <div className="form__errors">{errors.backSum}</div>
                ) : null}
            </div>
        </>
        }

        <div className="form__title">
            Ваши товары
        </div>

        <div className="form__row">
            {cart.map(cartItem => <ProductCart
                deleteProductFromCart={deleteProductFromCart} key={cartItem.variantID} product={cartItem}/>)}
        </div>
    </form>
}
