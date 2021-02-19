import React, {useState, useEffect} from "react";
import {API} from "../client/api";
import {CONFIG} from "../client/config";

import {ProductCard, Spinner, Button} from "../components";
import {SubscribeWithStore} from "../client/subscribe";

export default function ProductList({products}) {
    const AppStore = SubscribeWithStore();
    const [hasMore, updateHasMore] = useState(AppStore.state.pages > 1);
    const [isLoading, updateIsLoading] = useState(false);

    const fetchMoreProducts = () => {
        let newPage = AppStore.state.page + 1;

        updateIsLoading(true);

        AppStore.dispatch({type: "UPDATE_PAG_PAGE", page: newPage});

        if (newPage >= AppStore.state.pages) {
            updateHasMore(false);

            return;
        }
    }

    useEffect(() => {
        updateHasMore(AppStore.state.pages > 1);
        updateIsLoading(false);
    }, [AppStore.state.pages]);



    return <>
        {products.map(product => <ProductCard product={product} key={product.id}/>)}
        {hasMore &&
            <div className="catalog__load-more">
                {!isLoading ?
                    <Button state="active" title="Загрузить еще" clickAction={fetchMoreProducts}  />
                    : <Spinner />
                }
            </div>
        }
    </>
}
