import {Input, ProductCart, Radio} from "./index";

import {Formik} from 'formik';
import * as Yup from 'yup';

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
        .max(50, 'Поле не должно содержать более 50 символов')
        .integer('Поле  должно содержать только целые числа')
        .required('Обязательно для заполнения'),
    appartment: Yup.number()
        .max(50, 'Поле не должно содержать более 50 символов')
        .integer('Поле  должно содержать только целые числа')
        .required('Обязательно для заполнения'),
    backSum: Yup.number()
        .max(50, 'Поле не должно содержать более 50 символов')
        .integer('Поле  должно содержать только целые числа')
        .required('Обязательно для заполнения'),
    phone: Yup.string()
        .min(17, 'Номер телефона не валидный')
        .required('Обязательно для заполнения'),
});

export default function OrderForm({deleteProductFromCart, cart}) {
    return <Formik
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
              /* and other goodies */
          }) => (
            <form className="form form-order">
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
                        <Radio value="curier" label="Наличными курьеру" name="paymentmethod"/>
                    </div>
                </div>

                {values.paymentmethod === 'curier' &&
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
                        deleteProductFromCart={deleteProductFromCart} key={cartItem.id} product={cartItem}/>)}
                </div>
            </form>
        )}
    </Formik>
}
