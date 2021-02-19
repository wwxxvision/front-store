import React, {useState, useEffect} from "react";
import {API} from "../client/api";
import {CONFIG} from "../client/config";

import {ProductCard, Spinner, Button} from "../components";
import {SubscribeWithStore} from "../client/subscribe";

export default function ProductList({products}) {
    const AppStore = SubscribeWithStore();
    const [hasMore, updateHasMore] = useState(AppStore.state.pages > 1);

    const fetchMoreProducts = () => {
        let newPage = AppStore.state.page + 1;

        AppStore.dispatch({type: "UPDATE_PAG_PAGE", page: newPage});

        if (newPage >= AppStore.state.pages) {
            updateHasMore(false);

            return;
        }
    }

    useEffect(() => {
        updateHasMore(AppStore.state.pages > 1);
    }, [AppStore.state.pages]);



    return <>
        {products.map(product => <ProductCard product={product} key={product.id}/>)}
            <div className="catalog__load-more">
                {!AppStore.state.loading.loadMoreButton ?
                    hasMore ? <Button state="active" title="Загрузить еще" clickAction={fetchMoreProducts}  /> :  ''
                    : <Spinner />
                }
            </div>
    </>
}
