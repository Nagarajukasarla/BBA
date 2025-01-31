import APIResponse from "../../classes/APIResponse";
import API_ROUTES from "../../constants/apiRoutes";
import BaseService from "./baseService";

class ShopService extends BaseService {

    async fetchShop<LiteShop>(id: number): Promise<APIResponse<LiteShop>> {
        return this.get<LiteShop>(API_ROUTES.FETCH_LITE_SHOP)
    }
}