import React, {useState} from "react";
import {API} from "../client/api";
import {CONFIG} from "../client/config";

import {ProductCard, Spinner} from "../components";

export default function ProductList({initialProducts = [], pages = 1, categoryID}) {
    const [products, updateProducts] = useState(initialProducts);
    const [hasMore, updateHasMore] = useState(pages > 1);
    const [page, updatePage] = useState(1);
    const [isLoading, upateIsLoading] = useState(false);

    const fetchMoreProducts = async () => {
        let newPage = page + 1;

        upateIsLoading(true);
        updatePage(newPage);

        try {

            const productsResponse = await fetch(API.CATALOG_PRODUCTS.url + '&category=' + categoryID + '&page=' + newPage + `&per_page=${CONFIG.PRODUCTS_PER_PAGE}`, API.CATALOG_PRODUCTS.options);
            const newProducts = await productsResponse.json();

            if (newProducts.data.products) {
                updateProducts([...products, ...newProducts.data.products]);
            } else {
                updateHasMore(false);
            }

        } catch (err) {
            updateHasMore(false);
        }

        if (newPage >= pages) {
            updateHasMore(false);

            return;
        }

        upateIsLoading(false);
    }

    return <>
        {products.map(product => <ProductCard product={product} key={product.product.id}/>)}
        {hasMore &&
            <div className="catalog__load-more">
                {!isLoading ?
                    <div onClick={fetchMoreProducts} className="button button_state-active">Загрузить еще</div>
                    : <Spinner />
                }
            </div>
        }
    </>
}
