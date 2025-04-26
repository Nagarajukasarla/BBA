import React from "react";
import { Route, Routes } from "react-router-dom";
import Spinner from "../components/common/Spinner";
import AppLayout from "../components/layouts/AppLayout";
import RouteGuard from "./RouteGuard";
import { NewInvoice } from "@/pages/newInvoice/NewInvoice";

const Login = React.lazy(() => import("../pages/Login"));
const Register = React.lazy(() => import("../pages/Register"));
const ForgotPassword = React.lazy(
    () => import("../components/features/ForgotPassword")
);
const ResetPassword = React.lazy(
    () => import("../components/features/ResetPassword")
);

const Dashboard = React.lazy(() => import("../pages/Dashboard"));
const Invoice = React.lazy(() => import("../pages/Invoice"));
const Stocks = React.lazy(() => import("../pages/Stocks"));
const Customers = React.lazy(() => import("../pages/Customers"));
const Subscriptions = React.lazy(() => import("../pages/Subscriptions"));
const About = React.lazy(() => import("../pages/About"));
const Settings = React.lazy(() => import("../pages/Settings"));

const NotFound = React.lazy(() => import("../pages/NotFound"));

const AppRoutes: React.FC = () => (
    <React.Suspense fallback={<Spinner />}>
        <Routes>
            {/* Auth routes - No Layout */}
            <Route
                path="/login"
                element={
                    <RouteGuard isAuthPage={true}>
                        <Login />
                    </RouteGuard>
                }
            />
            <Route
                path="/register"
                element={
                    <RouteGuard isAuthPage={true}>
                        <Register />
                    </RouteGuard>
                }
            />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            {/* App Routes - With AppLayout */}
            <Route
                element={
                    <RouteGuard>
                        <AppLayout />
                    </RouteGuard>
                }
            >
                <Route path="/" element={<Dashboard />} />
                <Route path="/app">
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="invoice" element={<Invoice />} />
                    <Route path="new-invoice" element={<NewInvoice />} />
                    <Route path="stocks" element={<Stocks />} />
                    <Route path="customers" element={<Customers />} />
                    <Route path="subscriptions" element={<Subscriptions />} />
                    <Route path="about" element={<About />} />
                    <Route path="settings" element={<Settings />} />
                </Route>
            </Route>

            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    </React.Suspense>
);

export default AppRoutes;