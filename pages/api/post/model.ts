import {BaseContoller} from "../../../server/controllers/BaseContoller";

export default (req, res) => {
    const controller = new BaseContoller(req, res);

    controller.Post();
}
