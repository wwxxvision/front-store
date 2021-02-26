import React, {useState} from 'react';
import {SubscribeWithStore} from "../client/subscribe";

import {Button, FilterAttribute, Spinner} from "../components";

function initFilters(attributesList) {
    return attributesList.map(attribute => {
        return {
            ...attribute,
            terms: attribute.terms.map(term => ({
                ...term,
                active: false
            }))
        }
    })
}

export default function FilterList({attributesList}) {
    const [filters, updateFilters] = useState(initFilters(attributesList));
    const resetedFilters = initFilters(attributesList);
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

        updateFilters(newFilters);
    }


    const acceptFilters = () => {
        AppStore.dispatch({type: "UPDATE_CATALOG_FITLERS", filters: filters});
    };

    const resetFilters = () => {
        if (!AppStore.state.loading.acceptFilterButton)
            updateFilters(resetedFilters);
            AppStore.dispatch({type: "UPDATE_CATALOG_FITLERS", filters: resetedFilters});
    }


    return <>
        {filters.map(attribute => <FilterAttribute onChange={onChangeFilterAttribute}
                                                   key={attribute.id} attribute={attribute}/>)}
        <div className="filter-buttons">
            <div onClick={resetFilters} className="filter-buttons__reset">Сбросить фильтры</div>
            {!AppStore.state.loading.acceptFilterButton ?
                <Button state="active" clickAction={acceptFilters}
                        title="Применить"/> : <Spinner/>}
        </div>

    </>
}
