import {ProductController} from "../../server/controllers/ProductController";

export default (req, res) => {
    const productController = new ProductController(req, res);
    productController.GetList();
}
