import {useContext, useEffect} from "react";
import {store} from "./store";
import {Empty} from "./utils";
import {getFilterProductsQuery} from "./shop/functions";
import {fetchProducts} from "./fetch";

export function SubscribeWithStore() {
    const AppStore = useContext(store);

    return AppStore;
}

export function SubscribeOnProductsFilter(state, dispatch) {
    useEffect(async () => {
        if (!Empty(state.filters)) {
            dispatch({type: "UPDATE_LOADING_STATE", loading: {key: 'acceptFilterButton', value: true}});

            let filterProductsQuery = getFilterProductsQuery(state.filters);

            const products = await fetchProducts(state.categoryID, 1, filterProductsQuery);

            dispatch({type: "UPDATE_CATALOG_PRODUCTS", products: products.data});
            dispatch({type: "UPDATE_LOADING_STATE", loading: {key: 'acceptFilterButton', value: false}});
            dispatch({type: "UPDATE_PAG_PAGES", pages: products.pages});
            dispatch({type: "UPDATE_PAG_PAGE", page: 1});
        }
    }, [state.filters]);
}

export function SubscribeOnProductsPagPage(state, dispatch) {
    useEffect(async () => {
        if (state.page > 1) {
            dispatch({type: "UPDATE_LOADING_STATE", loading: {key: 'loadMoreButton', value: true}});
            let filterProductsQuery = getFilterProductsQuery(state.filters);

            const products = await fetchProducts(state.categoryID, state.page, filterProductsQuery);

            dispatch({type: "ADD_CATALOG_PRODUCTS", products: products.data});
            dispatch({type: "UPDATE_LOADING_STATE", loading: {key: 'loadMoreButton', value: false}});
            dispatch({type: "UPDATE_PAG_PAGES", pages: products.pages});
        }
    }, [state.page]);
}

