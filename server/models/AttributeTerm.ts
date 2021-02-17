
type AttributeTermType =  {
    id: Number
    name: String
    slug: String
    type: String
    order_by: String
    has_archives: Boolean
}

export class AttributeTermModel {
    attributeTerm: AttributeTermType;

    constructor(Data) {
        this.attributeTerm = Data;
    }

}
