import {Select, ColorPicker} from "./";
import React, {useEffect} from "react";
import {SubscribeWithStore} from "../client/subscribe";

export default function Variant({type, variant}) {

    const AppStore = SubscribeWithStore();

    const onChange = (option) => {
        AppStore.dispatch({
            type: "UPDATE_PRODUCT",
            product: {
                key: "size",
                value: option
            }
        });
    }

    useEffect(() => {
        if (type === 'select' && variant.name === 'Размер') {
            AppStore.dispatch({
                type: "UPDATE_PRODUCT",
                product: {
                    key: "size",
                    value: variant.options[0]
                }
            });
        }
    }, [variant.options])

    return <div key={variant.id} className="variant">
        <div className="variant__label">{variant.name}:</div>
        {type === "select" &&
            <Select onChange={onChange} options={variant.options}/>
        }
        {type === 'color' &&
            <ColorPicker options={variant.options} />
        }
    </div>
}
