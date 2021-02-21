export function getCurrentCategoryBySlug(allCategories, slug) {
    return allCategories.find(_category => _category.slug === slug);
}

export function getFilterProductsQuery(filters) {
    let query = "";

    filters.forEach(filter => {
        let newQuery = `&filter_atr[${filter.slug}]=`;
        let hasActiveTerm = false;
        let terms = [];

        filter.terms.find((term, index) => {
            if (term.active) {
                hasActiveTerm = true;
                terms = [...terms, term.id];
            } else {
                return;
            }
        })

        if (hasActiveTerm)
            query += newQuery + terms.join(',');
    })

    return query;
}

export function getParentCategory(id, allCategories) {
    return allCategories.find(category => category.id == id);
}

export function getCrumbs(category, allCategories, product) {
    let crubms = [{
        title: "Главная",
        link: {
            href: '/'
        }
    }];

    if (category.parent !== 0) {
        const parent = getParentCategory(category.parent, allCategories)
        crubms = [...crubms, {
            title: parent.name,
            link: {
                href: {pathname: '/catalog', query: {slug: parent.slug}},
                as: `/catalog/${parent.slug}`
            }
        }]
    }

    crubms = [...crubms, {
        title: category.name,
        link: {
            href: {pathname: '/catalog', query: {slug: category.slug}},
            as: `/catalog/${category.slug}`
        }
    }];

    if (product) {
        crubms = [...crubms, {
            title: product.name,
            link: {
                href: {pathname: '/product', query: {product: product.id}},
                as: `/product/${product.id}`
            }
        }];
    }

    return crubms;
}

export function calculateSalePricePercent(oldPrice, newPrice) {
    return Math.round(100 - ((Number(newPrice) * 100) / Number(oldPrice)))
}

export function isSale(salePrice) {
    return Boolean(salePrice);
}


export function getImageSrcById(id, images) {
    let image = images.find(image => image.id === id);

    return image.src;
}

export function calculateTotal(products) {
    let total = 0;

    products.forEach(product => total += Number(product.price));

    return total;
}

export  function getTitleByStockStatus(stockStatus) {
    if (stockStatus === "instock") {
        return 'в наличии';
    }

    else if (stockStatus === 'outstock') {
        return 'нет в наличии';
    }
}
