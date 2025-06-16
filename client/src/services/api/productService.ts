import APIResponse from "@/classes/APIResponse";
import DATA_ROUTES from "@/constants/dataRoutes";
import { Product } from "@/types/model";
import BaseService from "@/services/api/baseService";

class ProductService extends BaseService {
    /**
     * Fetches a list of products from the API
     * @returns A promise that resolves to an `APIResponse` containing an array of `Product` objects.
     */
    async fetchProducts(): Promise<APIResponse<Product[]>> {
        // In development, this will use MockDataService via BaseService
        // In production, this will use the real API
        return this.get<Product[]>(DATA_ROUTES.FETCH_PRODUCTS);
    }

    /**
     * Fetches a specific product by ID
     * @param id The product ID
     * @returns A promise that resolves to an `APIResponse` containing a `Product` object.
     */
    async fetchProductById(id: number): Promise<APIResponse<Product>> {
        // In development, this will use MockDataService via BaseService
        // In production, this will use the real API
        return this.get<Product>(`${DATA_ROUTES.FETCH_PRODUCTS}/${id}`);
    }
}

// Create a singleton instance
const productService = new ProductService();
export default productService;
