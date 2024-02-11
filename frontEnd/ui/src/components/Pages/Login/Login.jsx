import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../../utils/css/login.css";
import { setToken } from '../../../services/cookies/tokenUtils';
import { apiUrl } from "../../../config";

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [isFieldEmpty, setIsFieldEmpty] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        // handel null check here

        if (email === undefined || email === "") {
            setErrorMessage("Email can't be empty!");
            return;
        }
        if (password === undefined || password === "") {
            setErrorMessage("Password can't be empty!");
            return;
        }



        fetch(`${apiUrl}/api/v1/auth/authenticate`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    console.error("Authentication Failed");
                }
            })
            .then((data) => {
                if (data && data.token) {
                    setToken(data.token);
                    navigate("/app/dashboard");
                }
            })

            .catch((error) => {
                console.log("Error: ", error);
                setIsFieldEmpty(true);
            });
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === "email") {
            setEmail(value);
        } else {
            setPassword(value);
        }
    };

    return (
        <React.Fragment>
            <div className="loginHeader">
                <p>BBA</p>
            </div>
            <div className="loginBody">
                <div className="head-txt">
                    <p>Login</p>
                </div>
                {isFieldEmpty && (
                    <div className="login-error">
                        <img src="./warning.png"  alt="warning" />
                        <p>{errorMessage}</p>
                    </div>
                )}
                <div className="login-form">
                    <form method="POST">
                        <div className="email">
                            <input
                                type="email"
                                name="email"
                                value={email}
                                id="email"
                                placeholder="Email"
                                onChange={(event) => handleInputChange(event)}
                            />
                        </div>
                        <div className="passwd">
                            <input
                                type="password"
                                name="password"
                                value={password}
                                id="password"
                                placeholder="Password"
                                onChange={(event) => handleInputChange(event)}
                            />
                        </div>
                        <div className="login-btn">
                            <button onClick={handleSubmit}>
                                Login
                            </button>
                        </div>
                        <div className="new-user">
                            <p>
                                Don't have an account?
                                <span>
                                    <Link to="/signup">Create Account</Link>
                                </span>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </React.Fragment>
    );
};
