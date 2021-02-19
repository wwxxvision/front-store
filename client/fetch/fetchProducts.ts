import {API} from "../api";
import {CONFIG} from "../config";


export default async function FetchProducts(categoryID, page = 1, filterQuery = "") {
    try {
        let url = "";
        if (process.env.APP_URL) {
            url = process.env.APP_URL  + API.CATALOG_PRODUCTS.url + `&category=${categoryID}` + `&per_page=${CONFIG.PRODUCTS_PER_PAGE}&page=${page}`;
        }
        else {
            url = API.CATALOG_PRODUCTS.url + `&category=${categoryID}` + `&per_page=${CONFIG.PRODUCTS_PER_PAGE}&page=${page}`;
        }

        if (filterQuery) {
            url = API.CATALOG_PRODUCTS.url + `&category=${categoryID}` + `&per_page=${CONFIG.PRODUCTS_PER_PAGE}&page=${page}` + filterQuery;
        }


        const responseProducts = await fetch(url, {...API.CATALOG_PRODUCTS.options});
        const products = await responseProducts.json();

        return {data: products.data, pages: products.pages};
    }

    catch (err) {
        return [];
    }
}
