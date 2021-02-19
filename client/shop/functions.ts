
export function getCurrentCategoryBySlug(allCategories, slug) {
    return  allCategories.find(_category => _category.slug === slug);
}

export  function getFilterProductsQuery(filters) {
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
    })

    return query;
}
