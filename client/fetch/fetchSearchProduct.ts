import {API} from "../api";


export default async function fetchSearchProducts(searchStr = "") {
    try {
        let url = "";
        if (process.env.APP_URL) {
            url = process.env.APP_URL + API.CATALOG_PRODUCTS.url;
        } else {
            url = API.CATALOG_PRODUCTS.url;
        }


        url += `&search=${searchStr}&per_page=5`;

        url = encodeURI(url);

        const responseProducts = await fetch(url, {...API.CATALOG_PRODUCTS.options});
        const products = await responseProducts.json();

        return {data: products.data.map(product => ({id: product.id, name: product.name}))};
    } catch (err) {
        return [];
    }
}
