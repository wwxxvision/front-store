import {ProductController} from "../../../server/controllers/ProductController";
import {CategoryController} from "../../../server/controllers/CategoryController";
import {AttributeController} from "../../../server/controllers/AttributeController";
import {AttributeTermController} from "../../../server/controllers/AttributeTermController";

export default (req, res) => {
    const controllersList = {
        'products': ProductController,
        'categories': CategoryController,
        'attributes': AttributeController,
        'attributeTerm': AttributeTermController,
    }

    const method = req.query.method,
        type = req.query.type;


    const controller = new controllersList[type](req, res);

    controller[method]();
}
