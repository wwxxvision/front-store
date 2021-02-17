import {UTILS} from "../client/utils";

import Link from 'next/link';
import Image from 'next/image';


export default function ProductCard({product}) {
    const productIsSale = Boolean(product.product.sale_price);
    const productThumbnailImage = product.product.images[0];

    return <Link href={`/product/${product.product.id}`}>
        <a className="product-card">
            <div className="product-card__thumbnail">
                {productIsSale &&
                <div
                    className="product-card__label product-card__label_state-sale">- {UTILS.PRODUCT.CalculateSalePricePercent(product.product.regular_price, product.product.sale_price)}%</div>
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
                {product.product.name}
            </div>

            <div className="product-card__price">
                {productIsSale &&
                <div className="old-price">
                    {product.product.regular_price} руб
                </div>
                }
                <div className="new-price">
                    {product.product.price} руб
                </div>
            </div>
        </a>
    </Link>
}
