import {useContext, useEffect, useState} from "react";
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

export function useSubscribeOnProductVariations(variants, attributes) {
    const AppStore = SubscribeWithStore();
    const [variant, updateVariant] = useState(variants[0]);
    const [attributesVariant, updateAttributes] = useState(attributes);

    useEffect(() => {
        const selectedColor = AppStore.state.product.color;
        let variantsWithSelectedColor = [];

        variants.forEach(variant => {
            variant.attributes.forEach(attr => {
                if (attr.name === 'Цвет' && attr.option === selectedColor) {
                    variantsWithSelectedColor = [...variantsWithSelectedColor, variant];
                }
            })
        });

        let variantsSizeAttr = [];

        variantsWithSelectedColor.forEach(variant => {
            let sizeAttr = variant.attributes.find(attr => attr.name === 'Размер');

            variantsSizeAttr = [...variantsSizeAttr, sizeAttr.option];
        });

        let newAttributesVariant = attributesVariant.map(attr => {
            if (attr.name === 'Размер') {
                attr.options = variantsSizeAttr;
            }

            return attr;
        })

        updateAttributes(newAttributesVariant);

    }, [AppStore.state.product.color]);

    useEffect(() => {
        if (AppStore.state.product.size)  {
            let currentVariant;

            variants.forEach(variant => {
                let equalColor = Boolean(variant.attributes.find(attr => attr.name === 'Цвет' && attr.option === AppStore.state.product.color));
                let equalSize = Boolean(variant.attributes.find(attr => attr.name === 'Размер' && attr.option === AppStore.state.product.size));

                if (equalColor && equalSize)
                    currentVariant = variant;
            })
            updateVariant(currentVariant);
        }
    }, [AppStore.state.product.size])


    return [variant, attributesVariant];
}
