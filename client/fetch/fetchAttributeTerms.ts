import {API} from "../api";

export default async function FetchAttributes(attributes) {
    try {
        let attributesList = [];

        for await (let attribute of attributes) {
            const responseAttributeTerm = await fetch(process.env.APP_URL + `/api/get/model?endpoint=products/attributes/${attribute.id}/terms&method=GetList`, {...API.ATTRIBUTE_TERMS.options});
            const attributeTerms = await responseAttributeTerm.json();

            if (attributeTerms.data instanceof Array && attributeTerms.data.length > 0) {
                let attributeWithTerms = {...attribute, terms: attributeTerms.data};
                attributesList = [...attributesList, attributeWithTerms];
            }
        }

        return  attributesList;
    }

    catch (err) {
        return [];
    }
}
