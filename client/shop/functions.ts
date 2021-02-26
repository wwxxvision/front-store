import fetchProduct from "../fetch/fetchProduct";
import fetchProductVariants from "../fetch/fetchProductVariants";

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
            href: {pathname: '/', query: {}}
        }
    }];

    if (category.parent !== 0) {
        const parent = getParentCategory(category.parent, allCategories)
        crubms = [...crubms, {
            title: parent.name,
            link: {
                href: {pathname: '/catalog/[slug]', query: {slug: parent.slug}},
            }
        }]
    }

    crubms = [...crubms, {
        title: category.name,
        link: {
            href: {pathname: '/catalog/[slug]', query: {slug: category.slug}},
        }
    }];

    if (product) {
        crubms = [...crubms, {
            title: product.name,
            link: {
                href: {pathname: '/catalog/[slug]', query: {slug: product.slug}},
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

    else if (stockStatus === 'outofstock') {
        return 'нет в наличии';
    }
}

export function colorToName(name) {
    return name.split('|')[0];
}

export function allCartItemsOutOfStock(cart) {
    return cart.some(cartItem => cartItem.isValide === false);
}

export async function synCartItemsWithServer(cart, putProductInCart) {
    for await (let cartItem of cart) {
        let productFromServer = await fetchProduct(cartItem.id);
        let productFromServerVariants = await  fetchProductVariants(cartItem.id);

        let currentVariant = productFromServerVariants.find(variant => variant.id === cartItem.variantID);

        await putProductInCart(productFromServer[0], currentVariant);
    }
}

export function createDataOrder(cart, formValues) {
    let dataOrder = {
        line_items: [],
        payment_method: formValues.paymentmethod,
        payment_method_title: formValues.paymentmethod,
        set_paid: false,
        status: "processing",
        billing: {
            first_name: formValues.name,
            last_name: formValues.secondName,
            address_1: `${formValues.street} ${formValues.house} ${formValues.appartment}`,
            city: "Ижевск",
            state: "Удмуртская республика",
            postcode: "22222",
            country: "RU",
            email: "wwxxrjct@gmail.com",
            phone: formValues.phone
        }
    };

    cart.forEach(cartItem =>  {
        dataOrder.line_items = [...dataOrder.line_items, { product_id: cartItem.id,
            variation_id: cartItem.variantID,
        }]
    })

    return dataOrder;
}
