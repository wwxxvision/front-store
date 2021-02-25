import {Overlay} from "../layouts";


export default function Modal({title, children}){

    return <Overlay>
        <div className="modal">
            <div className="modal__wrapper">
                <div className="modal__title">
                    {title}
                </div>
                <div className="modal__body">
                    {children}
                </div>
            </div>
        </div>
    </Overlay>
}
