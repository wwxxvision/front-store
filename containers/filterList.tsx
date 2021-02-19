import React, {useContext, useState} from 'react';
import {API} from "../client/api";
import {CONFIG} from "../client/config";
import  { SubscribeWithStore } from "../client/subscribe";


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
    const AppStore = SubscribeWithStore();

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

    const acceptFilters =  () =>  AppStore.dispatch({type: "UPDATE_CATALOG_FITLERS", filters: filters});

    return <>
        {attributesList.map(attribute => <FilterAttribute onChange={onChangeFilterAttribute}
                                                          key={attribute.id} attribute={attribute}/>)}
        <Button state="active" clickAction={acceptFilters} title="Применить"/>
    </>
}
