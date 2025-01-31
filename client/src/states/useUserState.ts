import { useEffect, useState } from "react";
import { LiteShop } from "../types/model";
import { fetchLiteShop, updateShop } from "../services/api";

const useShopState = () => {
    const [liteShop, setLiteShop] = useState<LiteShop | null>(null);

    // Here need to make sure that even if shop is present in local storage,
    // You need to call API with for token validation which is in http only cookies
    useEffect(() => {
        const storedShop = localStorage.getItem("shop");
        if (storedShop) {
            setLiteShop(JSON.parse(storedShop));
        } else {
            fetchShop();
        }
    }, []);

    const fetchShop = async () => {
        // Fetch shop from API using APIResponse wrapper class
        const shop = await fetchLiteShop();
        persistLiteShop(shop);
    };

    // Need to hanlde this error properly
    // First decided who and when user can update the shop details
    const updateLiteShop = async (shop: Partial<LiteShop>) => {
        // persistLiteShop(updatedShop);
    };

    const persistLiteShop = (shop: LiteShop) => {
        setLiteShop(shop);
        localStorage.setItem("shop", JSON.stringify(shop));
    };

    const clearLiteShop = () => {
        setLiteShop(null);
        localStorage.removeItem("shop");
    };

    // const verifyToken = ()

    return {
        liteShop,
        fetchShop,
        updateLiteShop,
        clearLiteShop,
        persistLiteShop,
    };
};

export default useShopState;
