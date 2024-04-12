import { createContext, useContext, useState } from "react";
import { fetchCustomers } from "../../services/utils/customer/server/customerHelper";

export const Data = createContext();

const Context = ({ children }) => {
    const [customers, setCustomers] = useState([]);
    return <Data.Provider value={{ customers, setCustomers }}>{children}</Data.Provider>
};

export default Context;