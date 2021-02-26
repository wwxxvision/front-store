import Image from "next/image";

import {getTitleByStockStatus, isSale} from "../client/shop/functions";
const classNames = require('classnames');
import {useSpring, animated} from 'react-spring'

export default function ProductCart({product, deleteProductFromCart, canRemove = true}) {
    const animations = useSpring({opacity: 1, from: {opacity: 0}})

    return <animated.div style={animations} className="product-cart">
        <div className="product-cart__thumb">
            <Image src={product.image.src} layout="responsive" height="80" width="80" objectFit="cover"/>
        </div>
        <div className="product-cart__info">
            <h3 className="name">
                {product.name}
            </h3>
            <div className="variants">
                {product.attributes.map(attribute => (
                    <div key={attribute.id} className="variant">
                        <span className="variant__name">{attribute.name}:</span>
                        <span className="variant__value">{attribute.option}</span>
                    </div>
                ))}
            </div>

            <div className="price-and-status">
                <span className="price">
                    {isSale(product.sale_price) &&
                    <span className="old-price">
                            {product.regular_price} руб
                        </span>
                    }

                    <span className="new-price">
                        {product.price} руб
                    </span>

                </span>
                <span className={classNames(['status', {
                    'status_type-preorder': product.stock_status === 'instock',
                    'status_type-outofstock': product.stock_status === 'outofstock'
                }])}>{getTitleByStockStatus(product.stock_status)}</span>
            </div>

        </div>
        {canRemove &&
            <div onClick={() => deleteProductFromCart(product.variantID)} className="product-cart__remove-icon">
                <Image src="/icons/crash.svg" height="20" width="16"/>
            </div>
        }
    </animated.div>
}
