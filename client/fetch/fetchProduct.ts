import {API} from "../api";

export default async function FetchProduct(id) {
    try {
        let url = "";
        if (process.env.APP_URL) {
            url = process.env.APP_URL  + API.CATALOG_PRODUCTS.url + `&include=${id}`;
        }
        else {
            url = API.CATALOG_PRODUCTS.url  + `&include=${id}`;
        }


        const responseProducts = await fetch(url, {...API.CATALOG_PRODUCTS.options});
        const product = await responseProducts.json();

        return product.data;
    }

    catch (err) {
        return [];
    }
}
