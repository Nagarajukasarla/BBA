import React, { useEffect, useState } from "react";
import { TokenManager } from "../utils/tokenUtils";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/common/Spinner";
import { authenticate } from "../services/api";

type RouteGuardProps = {
    children: React.ReactNode;
    isAuthPage?: boolean;
};

const RouteGuard: React.FC<RouteGuardProps> = ({
    children,
    isAuthPage = false,
}) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // useEffect(() => {
    //     const checkAuth = async () => {
    //         const token = TokenManager.getToken();
    //         console.log("Token: ", token);

    //         if (!token) {
    //             if (!isAuthPage) {
    //                 navigate("/login", { replace: true });
    //             }
    //             setIsLoading(false);
    //             return;
    //         }

    //         try {
    //             const authenticated = await authenticate();
    //             setIsAuthenticated(authenticated);

    //             if (authenticated && isAuthPage) {
    //                 navigate("/dashboard", { replace: true });
    //             } else if (!authenticated && !isAuthPage) {
    //                 navigate("/login", { replace: true });
    //             }
    //         } catch (error) {
    //             console.error("Auth check failed:", error);
    //             if (!isAuthPage) {
    //                 navigate("/login", { replace: true });
    //             }
    //         } finally {
    //             setIsLoading(false);
    //         }
    //     };

    //     checkAuth();
    // }, [navigate, isAuthPage]);

    // if (isLoading) {
    //     return <Spinner />;
    // }

    // // Only render children if authenticated or it's an auth page
    // if (!isAuthPage && !isAuthenticated) {
    //     return null;
    // }

    return <>{children}</>;
};

export default RouteGuard;
