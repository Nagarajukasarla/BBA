import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Spinner from "../components/common/Spinner";
// import Dashboard from "../pages/Dashboard";
import Stocks from "../pages/Stocks";
import RouteGuard from "./RouteGuard";

const Login = React.lazy(() => import("../pages/auth/Login"));
const Register = React.lazy(() => import("../pages/auth/Register"));
const ForgotPassword = React.lazy(() => import("../pages/auth/ForgotPassword"));
const ResetPassword = React.lazy(() => import("../pages/auth/ResetPassword"));

const AppRoutes: React.FC = () => (
    <BrowserRouter>
        <React.Suspense fallback={<Spinner />} >
            <Routes>
                <Route path="/login" element={
                    <RouteGuard isAuthPage={true}>
                        <Login />
                    </RouteGuard>
                } />
                <Route path="/register" element={
                    <RouteGuard isAuthPage={true}>
                        <Register />
                    </RouteGuard>
                } />
                <Route path="/e" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                {/* <Route path="/" element={
                    <RouteGuard>
                        <Dashboard />
                    </RouteGuard>
                } /> */}
                <Route path="/stocks" element={
                    <RouteGuard>
                        <Stocks />
                    </RouteGuard>
                } />
            </Routes>
        </React.Suspense>
    </BrowserRouter>
);

export default AppRoutes;