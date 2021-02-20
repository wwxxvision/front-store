import {API} from "../api";

export default async function fetchProductVariants(id) {
    try {
        let url = "";
        if (process.env.APP_URL) {
            url = process.env.APP_URL  + `/api/get/model?endpoint=products/${id}/variations&method=GetList&pagination=yes`;
        }
        else {
            url = `/api/get/model?endpoint=products/${id}/variations&method=GetList&pagination=yes`;
        }


        const responseProducts = await fetch(url, {...API.CATALOG_PRODUCTS.options});
        const product = await responseProducts.json();

        return product.data;
    }

    catch (err) {
        return [];
    }
}
