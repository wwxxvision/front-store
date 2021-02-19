import {useContext, useEffect} from "react";
import {store} from "./store";
import {Empty} from "./utils";
import {getFilterProductsQuery} from "./shop/functions";
import {fetchProducts} from "./fetch";

export  function SubscribeWithStore() {
    const AppStore = useContext(store);

    return AppStore;
}

export  function SubscribeWithFilters(state, dispatch) {
    useEffect(async () => {
        if (!Empty(state.filters)) {
            let filterProductsQuery = getFilterProductsQuery(state.filters);

            const products = await fetchProducts(state.categoryID, state.page, filterProductsQuery);

            dispatch({type: "UPDATE_CATALOG_PRODUCTS", products: products});
        }
    }, [state.filters]);
}
