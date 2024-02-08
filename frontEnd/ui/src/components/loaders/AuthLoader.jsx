import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import './style.css'
import { getToken } from "../../services/cookies/tokenUtils";

export const AuthLoader = () => {
    const navigate = useNavigate();

    const token = getToken();
    const authenticate = () => {
        if (token) {
            fetch("https://noble-airport-411617.uw.r.appspot.com/api/v1/demo-controller", {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
                .then((response) => {
                    if (response.ok) {
                        console.log("Verified!")
                        navigate("/app/dashboard");
                    }
                })
                .catch((error) => {
                    console.error("Authentication failed : ", error);
                    navigate("/login");
                });
        }
        else {
            navigate("/login");
        }
    };

    useEffect(() => {
        authenticate();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="authLoader">
            <ClipLoader
                color={"#772c00"}
                loading={true}
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    );
};
