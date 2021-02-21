import Image from "next/image";
import {getTitleByStockStatus} from "../client/shop/functions";


export default function ProductCart({product}) {
    return <div className="product-cart">
        <div className="product-cart__thumb">
            <Image src={product.image.src} layout="responsive" height="80" width="80"  objectFit="cover" />
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
                <span className="price">{product.price} руб</span>
                <span className="status status_type-preorder">{getTitleByStockStatus(product.stock_status)}</span>
            </div>

        </div>
        <div className="product-cart__remove-icon"></div>
    </div>
}
