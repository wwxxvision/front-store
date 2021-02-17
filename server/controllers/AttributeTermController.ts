import {BaseContoller} from "./BaseContoller";
import {AttributeTermModel} from "../models/AttributeTerm";


export class AttributeTermController extends BaseContoller {
    endpoint = `products/attributes/${this.query.id}/terms`
    model = AttributeTermModel

    public async GetList() {
        try {
            let attributeTerms = await super.GetList();
            attributeTerms = attributeTerms.map(attributeTerm => new this.model(attributeTerm));
            this.SetResponse(attributeTerms, 'ok');
        } catch (err) {
            console.log(err);
        }

    }
}
