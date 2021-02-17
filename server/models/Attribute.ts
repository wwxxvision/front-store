
type AttributeType =  {
    id: Number
    name: String
    slug: String
    type: String
    order_by: String
    has_archives: Boolean
}

export class AttributeModel {
    attribute: AttributeType;

    constructor(Data) {
        this.attribute = Data;
    }

}
