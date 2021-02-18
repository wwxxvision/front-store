import React, {useContext, useState} from 'react';
import {API} from "../client/api";
import {CONFIG} from "../client/config";
import {store} from '../client/store';

import {Button, FilterAttribute} from "../components";

function initFilters(attributesList) {
    return attributesList.map(attribute => {
        return {
            slug: attribute.slug,
            terms: attribute.terms.map(term => ({id: term.id, active: false}))
        }
    })
}

export default function FilterList({attributesList, categoryID}) {
    const [filters, updateFilters] = useState(initFilters(attributesList));
    const AppStore = useContext(store);

    const onChangeFilterAttribute = (slug, termID) => {
        let newFilters = filters.map(filter => {
            if (filter.slug === slug) {
                filter.terms = filter.terms.map(term => {
                    if (term.id === termID) {
                        term.active = !term.active;
                    }

                    return term;
                })
            }

            return filter;
        });

        return function () {
            updateFilters(newFilters);
        }
    }

    const acceptFilters = async() => {
        let query = "";

        filters.forEach(filter => {
            let newQuery = `&filter_atr[${filter.slug}]=`;
            let hasActiveTerm = false;
            let terms = [];

            filter.terms.find((term, index) => {
                if (term.active) {
                    hasActiveTerm = true;
                    terms = [...terms, term.id];
                }
                else {
                    return;
                }
            })

            if (hasActiveTerm)
                query += newQuery  + terms.join(',');
        });

        if (query) {
            const responseProducts = await fetch( API.FILTER_CATALOG_PRODUCTS.url + `&category=${categoryID}`
                    + `&per_page=${CONFIG.PRODUCTS_PER_PAGE}${query}&page=1`, {...API.FILTER_CATALOG_PRODUCTS.options});
            const products = await responseProducts.json();

            AppStore.dispatch({type: "UPDATE_CATALOG_PRODUCTS", products: products.data})
        }
    }

    return <>
        {attributesList.map(attribute => <FilterAttribute onChange={onChangeFilterAttribute}
                                                          key={attribute.id} attribute={attribute}/>)}
        <Button state="active" clickAction={acceptFilters} title="Применить"/>
    </>
}
