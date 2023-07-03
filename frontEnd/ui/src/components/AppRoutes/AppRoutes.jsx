import React from "react";
import { Routes, Route } from "react-router-dom";
import { Dashboard } from "../Pages/Dashboard/Dashboard";
import { Invoice } from "../Pages/Invoice/Invoice";
import { Customers } from "../Pages/Customers/Customers";
import { Stocks } from "../Pages/Stocks/Stocks";
import { Subscriptions } from "../Pages/Subscriptions/Subscriptions";
import { About } from "../Pages/About/About";
import { Settings } from "../Pages/Settings/Settings";
import { IconsWindow } from "../IconsWindow";
import { NewInvoice } from "../Pages/Invoice/NewInvoice";
import { NewCustomer } from "../Pages/Customers/NewCustomer";
import { Companies } from "../Pages/Companies/Companies";


export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/invoice" element={<Invoice />} />
            <Route path="/invoice/new" element={<NewInvoice />} />
            <Route path="/customer" element={<Customers />} />
            <Route path="/stocks" element={<Stocks />} />
            <Route path="/subscriptions" element={<Subscriptions />} />
            <Route path="/about" element={<About />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/icons" element={<IconsWindow />} />        
            <Route path="/new-customer" element={<NewCustomer />} />
            <Route path="/companies" element={<Companies />} />
        </Routes>

    )
}