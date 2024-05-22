import { createContext, useState } from "react";

export const Data = createContext();

const Context = ({ children }) => {
    const [customers, setCustomers] = useState([]);
    return <Data.Provider value={{ customers, setCustomers }}>{children}</Data.Provider>
};

export default Context;