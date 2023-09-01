import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import './style.css'

export const AuthLoader = () => {
    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    console.log(token);
    const authenticate = () => {
        if (token) {
            fetch("http://localhost:8080/api/v1/demo-controller", {
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
