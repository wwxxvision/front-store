import {useContext, useEffect, useState} from "react";
import {store} from "./store";
import {Empty} from "./utils";
import {getFilterProductsQuery, synCartItemsWithServer} from "./shop/functions";
import {fetchProducts} from "./fetch";
import localForage from "localforage";


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
            dispatch({type: "UPDATE_PAG_PAGE", page: 1});
            dispatch({type: "UPDATE_PAG_PAGES", pages: Number(products.pages)});
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

export function useSubscribeOnProductVariations(variants, attributes, images) {
    const AppStore = SubscribeWithStore();
    const [variant, updateVariant] = useState(variants[0]);
    const [attributesVariant, updateAttributes] = useState(attributes);
    const [activeGalleryImage, updateActiveGalleryImage] = useState(images[0].id);

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
        if (AppStore.state.product.size) {
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


    return [variant, attributesVariant, activeGalleryImage, updateActiveGalleryImage];
}

export function useSubscribeProductOnCart(variant, product, callback) {
    const AppStore = SubscribeWithStore();

    useEffect(async () => {
        let cart = await localForage.getItem('cart') ?? [];

        AppStore.dispatch({
            type: 'UPDATE_CART',
            cart
        });

    }, []);

    const productIsAlreadyInCart = () => {
        let cart = AppStore.state.cart ?? [];
        let productInCart = Boolean(cart.find(cartItem => cartItem.variantID === variant.id));

        return productInCart;
    }


    const putProductInCart = async () => {
        if (!productIsAlreadyInCart()) {
            const preparedProductDataForCart = {
                ...variant,
                id: product.id,
                name: product.name,
                variantID: variant.id,
                quantity: 1,
                price: Number(variant.price),
                availableQuantity: variant.stock_quantity,
                isValide: 1 <= variant.stock_quantity,
            }

            let cart = await localForage.getItem('cart') ?? [];
            let cartWithoutPutProduct = cart.filter(cartItem => cartItem.variantID != preparedProductDataForCart.variantID);

            cartWithoutPutProduct = [...cartWithoutPutProduct, preparedProductDataForCart];

            AppStore.dispatch({
                type: 'UPDATE_CART',
                cart: cartWithoutPutProduct
            });
            callback();
            localForage.setItem('cart', cartWithoutPutProduct);

        }
    }


    return [putProductInCart, productIsAlreadyInCart, AppStore.state.cart];
}

export function useSubscribeOnCart(syncWithServer = true) {
    const AppStore = SubscribeWithStore();

    const [cart, setCart] = useState([]);
    const [isLoading, updateIsLoading] = useState(true);

    const putProductInCart = async (product, variant) => {
        const preparedProductDataForCart = {
            ...variant,
            id: product.id,
            name: product.name,
            variantID: variant.id,
            quantity: 1,
            price: Number(variant.price),
            availableQuantity: variant.stock_quantity,
            isValide: 1 <= variant.stock_quantity,
        }

        let cart = await localForage.getItem('cart') ?? [];
        let cartWithoutPutProduct = cart.filter(cartItem => cartItem.variantID != preparedProductDataForCart.variantID);

        cartWithoutPutProduct = [...cartWithoutPutProduct, preparedProductDataForCart];

        AppStore.dispatch({
            type: 'UPDATE_CART',
            cart: cartWithoutPutProduct
        });

        localForage.setItem('cart', cartWithoutPutProduct);

    }

    useEffect(async () => {
        let cart = await localForage.getItem('cart') ?? [];
        if (syncWithServer) {
            await synCartItemsWithServer(cart, putProductInCart);
        } else {
            AppStore.dispatch({
                type: 'UPDATE_CART',
                cart
            });
        }

        updateIsLoading(false);

    }, []);


    useEffect(async () => {
        setCart(AppStore.state.cart);
    }, [AppStore.state.cart]);

    const deleteProductFromCart = (id) => {
        let cartWithoutProduct = cart.filter(cartItem => cartItem.variantID !== id);

        AppStore.dispatch({
            type: 'UPDATE_CART',
            cart: cartWithoutProduct
        });

        localForage.setItem('cart', cartWithoutProduct);
    }

    const clearCart = () => {
        AppStore.dispatch({
            type: 'CLEAR_CART'
        });
        localForage.setItem('cart', [])
    };

    return [cart, deleteProductFromCart, isLoading, clearCart]
}
