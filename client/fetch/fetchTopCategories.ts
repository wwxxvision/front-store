import {API} from "../api";

export default async function FetchTopCategories() {
    try {
        const responseTopCategories = await fetch(process.env.APP_URL + API.TOP_CATEGORIES.url, {...API.TOP_CATEGORIES.options});
        const topCategories = await responseTopCategories.json();

        return topCategories.data;
    }

    catch (err) {
        return [];
    }
}
