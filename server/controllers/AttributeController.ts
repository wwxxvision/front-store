import {BaseContoller} from "./BaseContoller";
import {AttributeModel} from "../models/Attribute";


export class AttributeController extends BaseContoller {
    endpoint = 'products/attributes'
    model = AttributeModel

    public async GetList() {
        try {
            let attributes = await super.GetList();
            attributes = attributes.map(attribute => new this.model(attribute));
            this.SetResponse(attributes, 'ok');
        } catch (err) {
            console.log(err);
        }

    }
}
