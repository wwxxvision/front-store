import {useEffect, useState} from "react";
import {SubscribeWithStore} from "../client/subscribe";

function getColor(option) {
    const [name, color] = option.split('|');

    return color;
}

export default function ColorPicker({options}) {
    const AppStore = SubscribeWithStore();
    const [selected, select] = useState(options[0]);
    const selectHandler = (option) => {
        select(option);
        AppStore.dispatch({
            type: "UPDATE_PRODUCT",
            product: {
                key: "color",
                value: option
            }

        });
    }

    useEffect(() => {
        AppStore.dispatch({
            type: "UPDATE_PRODUCT",
            product: {
                key: "color",
                value: selected
            }
        });
    }, []);


    return <ul className="color-picker-list">
        {options.map(option => (
            <li onClick={() => selectHandler(option)} key={option} className="color-picker-list__item">
                <label className="color-picker">
                    <svg className="color-picker__svg" height="30" width="30">
                        <circle className="svg__circle_1"
                                fill={getColor(option)}
                                cx="15" cy="15"
                                r="11"/>
                        {selected === option &&
                        <circle className="svg__circle_2" fill="none" cx="15" cy="15"
                                r="14"/>
                        }
                    </svg>
                </label>
            </li>
        ))}
    </ul>
}
