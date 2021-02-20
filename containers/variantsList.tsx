import {Variant} from "../components";
import React from "react";



function getTypeVariant(variant) {
    if (variant === 'Цвет') {
        return 'color';
    } else if (variant === 'Размер') {
        return 'select';
    } else {
        return 'select';
    }
}

export default function VariantsList({variants}) {
    return      <div className="product__variants">
        {variants.map(variant => (<Variant key={variant.id} type={getTypeVariant(variant.name)} variant={variant}/>))}
    </div>
}
