import { useEffect, useState } from "react";
import { LiteShop } from "../types/model";
import { fetchLiteShop, updateShop } from "../services/api";

const useShopState = () => {
    const [liteShop, setLiteShop] = useState<LiteShop | null>(null);

    useEffect(() => {
        const storedShop = localStorage.getItem("shop");
        if (storedShop) {
            setLiteShop(JSON.parse(storedShop));
        }
        else {
            fetchShop();
        }
    }, []);

    const fetchShop = async () => {
        // Fetch shop from API using APIResponse wrapper class
        const shop = await fetchLiteShop();
        persistLiteShop(shop);
    };

    const updateLiteShop = async (shop: Partial<LiteShop>) => {
        // Update shop in API using APIResponse wrapper class
        const updatedShop = await updateShop(shop);
        persistLiteShop(updatedShop);
    };

    const persistLiteShop = (shop: LiteShop) => {
        setLiteShop(shop);
        localStorage.setItem("shop", JSON.stringify(shop));
    };

    const clearLiteShop = () => {
        setLiteShop(null);
        localStorage.removeItem("shop");
    };

    return {
        liteShop,
        fetchShop,
        updateLiteShop,
        clearLiteShop
    }
}

export default useShopState;