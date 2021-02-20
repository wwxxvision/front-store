import React, {createContext, useReducer} from 'react';

const initialState = {
    products: [],
    filters: [],
    page: 1,
    pages: 1,
    categoryID: 0,
    loading: {
        acceptFilterButton: false,
        loadMoreButton: false
    },
    product: {
        color: '',
        size: ''
    }

};
const store = createContext(initialState);
const {Provider} = store;

const StateProvider = ({children}) => {
    const [state, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case 'UPDATE_LOADING_STATE':
                return {
                    ...state, loading: {
                        ...state.loading, [action.loading.key]: action.loading.value
                    }
                };
                return {...state, page: action.page};
            case 'UPDATE_PRODUCT':
                return {
                    ...state, product: {
                        ...state.product, [action.product.key]: action.product.value
                    }
                };
                return {...state, page: action.page};
            case 'UPDATE_PAG_PAGE':
                return {...state, page: action.page};
            case 'UPDATE_PAG_PAGES':
                return {...state, pages: action.pages};
            case 'UPDATE_CATALOG_FITLERS':
                return {...state, filters: [...action.filters]};
            case 'UPDATE_CATALOG_PRODUCTS':
                return {...state, products: [...action.products]};
            case 'ADD_CATALOG_PRODUCTS':
                return {...state, products: [...state.products, ...action.products]};
            case 'UPDATE_CATEGORY_ID':
                return {...state, categoryID: action.categoryID};
            default:
                throw new Error();
        }
        ;
    }, initialState);

    return <Provider value={{state, dispatch}}>{children}</Provider>;
};

export {store, StateProvider}
