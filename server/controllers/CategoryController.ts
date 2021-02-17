import {BaseContoller} from "./BaseContoller";
import {CategoryModel} from "../models/Category";


export class CategoryController extends BaseContoller {
    endpoint = 'products/categories'
    model = CategoryModel

    public async GetList() {
        try {
            let categories = await super.GetList();
            categories = categories.map(category => new this.model(category));
            this.SetResponse(categories, 'ok');
        } catch (err) {
            console.log(err);
        }

    }
}
