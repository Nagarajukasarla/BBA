import { createContext, useState } from "react";

export const Data = createContext();

const Context = ({ children }) => {
    const [customers, setCustomers] = useState([]);
    const [shopId, setShopId] = useState("");

    return <Data.Provider value={{ customers, setCustomers, shopId, setShopId }}>{children}</Data.Provider>
};

export default Context;