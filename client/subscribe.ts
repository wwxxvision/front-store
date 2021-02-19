import {useContext, useEffect} from "react";
import {store} from "./store";
import {Empty} from "./utils";
import {getFilterProductsQuery} from "./shop/functions";
import {fetchProducts} from "./fetch";

export  function SubscribeWithStore() {
    const AppStore = useContext(store);

    return AppStore;
}

export  function SubscribeOnProductsFilter(state, dispatch) {
    useEffect(async () => {
        if (!Empty(state.filters)) {
            let filterProductsQuery = getFilterProductsQuery(state.filters);

            const products = await fetchProducts(state.categoryID, 1, filterProductsQuery);

            dispatch({type: "UPDATE_CATALOG_PRODUCTS", products: products.data});
            dispatch({type: "UPDATE_PAG_PAGES", pages: products.pages});
        }
    }, [state.filters]);
}

export  function SubscribeOnProductsPagPage(state, dispatch) {
    useEffect(async () => {
        if (state.page > 1) {
            let filterProductsQuery = getFilterProductsQuery(state.filters);

            const products = await fetchProducts(state.categoryID, state.page, filterProductsQuery);

            dispatch({type: "ADD_CATALOG_PRODUCTS", products: products.data});
            dispatch({type: "UPDATE_PAG_PAGES", pages: products.pages});
        }
    }, [state.page]);
}

