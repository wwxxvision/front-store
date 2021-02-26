import {calculateSalePricePercent} from "../client/shop/functions";

import Link from 'next/link';
import Image from 'next/image';


export default function ProductCard({product}) {
    const productIsSale = Boolean(product.sale_price);
    const productThumbnailImage = product.images[0];

    return <Link href={`/product/${product.id}`}>
        <a className="product-card">
            <div className="product-card__thumbnail">
                {productIsSale &&
                <div
                    className="product-card__label product-card__label_state-sale">- {calculateSalePricePercent(product.regular_price, product.sale_price)}%</div>
                }

                <Image
                    src={productThumbnailImage.src}
                    alt={productThumbnailImage.alt}
                    quality={85}
                    width={400}
                    height={400}
                    layout="responsive"
                />
            </div>

            <div className="product-card__name">
                {product.name}
            </div>

            <div className="product-card__price">
                {productIsSale &&
                <div className="old-price">
                    {product.regular_price} руб
                </div>
                }
                <div className="new-price">
                    {product.price} руб
                </div>
            </div>
        </a>
    </Link>
}
