import React, {createContext, useReducer} from 'react';

const initialState = {
    products: [],
    filters: [],
    page: 1,
    categoryID: 0

};
const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ( { children } ) => {
    const [state, dispatch] = useReducer((state, action) => {
        switch(action.type) {
            case 'UPDATE_CATALOG_FITLERS':
                return {...state, filters: [...action.filters]};
            case 'UPDATE_CATALOG_PRODUCTS':
                return {...state, products: [...action.products]};
            case 'UPDATE_CATEGORY_ID':
                return {...state, categoryID: action.categoryID};
            default:
                throw new Error();
        };
    }, initialState);

    return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider }
