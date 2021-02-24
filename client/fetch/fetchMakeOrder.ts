import {API} from "../api";

export default async function FetchMakeOrder(body) {
    try {
        let url = "";
        if (process.env.APP_URL) {
            url = process.env.APP_URL  + API.CREATE_ORDER.url;
        }
        else {
            url = API.CREATE_ORDER.url;
        }


        const response = await fetch(url, {...API.CREATE_ORDER.options, body: JSON.stringify(body)});
        const result = await response.json();

        return result;
    }

    catch (err) {
        return false;
    }
}
