import {API} from "../api";

export default  async function FetchChildTopCategories(topCategories) {
    try {
        let childTopCategoriesList = [];

        for await (let topyCategory of topCategories) {
            const responseChildTopCategories = await fetch(process.env.APP_URL + API.CHILD_TOP_CATEGORIES.url + `&parent=${topyCategory.id}`, {...API.CHILD_TOP_CATEGORIES.options});
            const childTopCategories = await responseChildTopCategories.json();

            if (childTopCategories.data instanceof Array && childTopCategories.data.length > 0)
                childTopCategoriesList = [...childTopCategoriesList, ...childTopCategories.data];
        }

        return childTopCategoriesList;
    }

    catch (err) {
        return [];
    }
}
