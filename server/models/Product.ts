
type ProductType =  {
    id: Number
    name: String
    slug: String
    permalink: String
    date_created: Date
    date_created_gmt: Date
    date_modified: Date
    date_modified_gmt: Date
    type: String
    status: String
    featured: Boolean
    catalog_visibility: String
    description: String
    short_description: String
    sku: String
    price: String
    regular_price: string
    sale_price: string
    date_on_sale_from: Date
    date_on_sale_from_gmt: Date
    date_on_sale_to: Date
    date_on_sale_to_gmt: Date
    price_html: String
    on_sale: Boolean
    purchasable: Boolean
    total_sales: Number
    virtual: Boolean
    downloadable: Boolean
    downloads: Array<[]>
    download_limit: Number
    download_expiry: Number
    external_url: String
    button_text: String
    tax_status: String
    tax_class: String
    manage_stock: Boolean
    stock_quantity: Number
    stock_status: String
    backorders: String
    backorders_allowed: Boolean
    backordered: Boolean
    sold_individually: Boolean
    weight: String
    dimensions: Object
    shipping_required: Boolean
    shipping_taxable: Boolean
    shipping_class: String
    shipping_class_id: Number
    reviews_allowed: Boolean
    average_rating: String
    rating_count: Number
    related_ids: Array<[]>
    upsell_ids: Array<[]>
    cross_sell_ids: Array<[]>
    parent_id: Number
    purchase_note: String
    categories: Array<[]>
    tags: Array<[]>
    images: Array<[]>
    attributes: Array<[]>
    default_attributes: Array<[]>
    variations: Array<[]>
    grouped_products: Array<[]>
    menu_order: Number
    meta_data: Array<[]>
}

export class ProductModel {
    product: ProductType;

    constructor(Data) {
        this.product = Data;
    }

}
