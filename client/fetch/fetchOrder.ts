import {API} from "../api";

export default async function fetchOrder(id) {
    try {
        let url = "";
        if (process.env.APP_URL) {
            url = process.env.APP_URL  + API.GET_ORDER.url + id;
        }
        else {
            url = API.GET_ORDER.url + id;
        }

        const response = await fetch(url, {...API.GET_ORDER.options});
        const result = await response.json();

        return result;
    }

    catch (err) {
        return false;
    }
}
