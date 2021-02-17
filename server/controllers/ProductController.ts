
import {BaseContoller} from "./BaseContoller";
import {ProductModel} from "../models/Product";

export class ProductController extends BaseContoller {
    endpoint = 'products'
    model = ProductModel

    public async GetList() {
        try {
            let products = await super.GetList(true);
            let pages = products.pages;
            products  = products.data.map(product => new this.model(product));
            this.SetResponse({products, pages}, 'ok');
        } catch (err) {
            console.log(err);
        }
    }

    public async GetCount() {

    }
}
