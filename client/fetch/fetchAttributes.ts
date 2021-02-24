import {API} from "../api";
import {Atrribute} from "../types";

export default async function FetchAttributes(): Promise<Array<Atrribute> | []> {
    try {
        const responseAttributes = await fetch(process.env.APP_URL + API.ATTRIBUTES.url, {...API.ATTRIBUTES.options});
        const attributes = await responseAttributes.json();

        return attributes.data;
    } catch (err) {
        return [];
    }
}
