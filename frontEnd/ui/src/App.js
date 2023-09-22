import { Route, Routes } from "react-router-dom";
import { Login } from "../src/components/Pages/Login/Login";
import { Signup } from "../src/components/Pages/Signup/Signup";
import "./App.css";
import { Root } from "./components/Root";
import { Dashboard } from "./components/Pages/Dashboard/Dashboard";
import { Invoice } from "./components/Pages/Invoice/Invoice";
import { Customers } from "./components/Pages/Customers/Customers";
import { Stocks } from "./components/Pages/Stocks/Stocks";
import { Subscriptions } from "./components/Pages/Subscriptions/Subscriptions";
import { About } from "./components/Pages/About/About";
import { Settings } from "./components/Pages/Settings/Settings";
import { NewInvoice } from "./components/Pages/Invoice/NewInvoice";
import { NewCustomer } from "./components/Pages/Customers/NewCustomer";
import { Companies } from "./components/Pages/Companies/Companies";
import { IconsWindow } from "./components/IconsWindow";
import { AuthLoader } from "./components/loaders/AuthLoader";
import { Server } from "./components/notifiers/Server";
import { AddOrEditStock } from "./components/Pages/Stocks/AddOrEditStock";

function App() {
    return (
        <Routes>
            <Route path="/" element={<AuthLoader />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/app/*" element={<Root />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="invoice" element={<Invoice />} />
                <Route path="new-invoice" element={<NewInvoice />} />
                <Route path="customer" element={<Customers />} />
                <Route path="new-customer" element={<NewCustomer />} />
                <Route path="stocks" element={<Stocks />} >
                    <Route path="add" element={<AddOrEditStock />} />
                    <Route path="edit" element={<AddOrEditStock />} />
                </Route>
                <Route path="subscriptions" element={<Subscriptions />} />
                <Route path="about" element={<About />} />
                <Route path="settings" element={<Settings />} />
                <Route path="companies" element={<Companies />} />
                <Route path="icons" element={<IconsWindow />} />
            </Route>
            <Route path="/server-down" element={<Server />} />
        </Routes>
    );
}

export default App;
