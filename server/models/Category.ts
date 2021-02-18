
type CategoryType =  {
    id: Number
    name: String
    slug: String
    parent: Number
    description: String
    display: String
    image: Object
    menu_order: Number
    count: Number
}

export default class CategoryModel {
    category: CategoryType;

    constructor(Data) {
        this.category = Data;
    }

}
