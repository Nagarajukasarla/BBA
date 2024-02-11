import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import "./style.css";
import { getToken } from "../../services/cookies/tokenUtils";

import { apiUrl } from "../../config";

export const AuthLoader = () => {
    const navigate = useNavigate();

    const token = getToken();
    const authenticate = () => {
        if (token) {
            fetch(`${`${apiUrl}/api/v1/demo-controller`}`, {
                method: "GET",
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            })
                .then((response) => {
                    if (response.ok) {
                        console.log("Verified!");
                        navigate("/app/dashboard");
                    }
                    else {
                        console.log(`Authorization failed with 403!`);
                    }
                })
                
                .catch((error) => {
                    console.error(`Authentication failed : ${error}`);
                    navigate("/login");
                });
        } else {
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
