import {Overlay} from "../layouts";
import {CONFIG} from "../client/config"
import Image from 'next/image';

export default function ModalOrder({orderID, onClose}) {

    return <Overlay>
        <div className="modal modal-order">
            <div className="modal__wrapper">
                <div className="modal__close">
                    <Image src="/icons/close.svg" onClick={onClose}  height={15} width={15} />
                </div>
                <div className="modal__image">
                    <Image src="/icons/status_ok.svg"  height={110} width={110} />
                </div>
                <div className="modal__title">
                    Номер заказа №{orderID}
                </div>
                <div className="modal__text">
                    Спасибо за оформление заказа! <br />
                    На ваш телефон отправлено смс-сообщение с ссылкой для отслеживания
                    заказ.
                </div>

                <div className="modal__footer">
                    Все вопросы можно оставить на нашу почту {CONFIG.ORGANIZATION.EMAIL_SUPPORT}
                </div>
            </div>
        </div>
    </Overlay>
}
