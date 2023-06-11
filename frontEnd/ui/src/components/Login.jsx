import React, { Component } from "react";
import "../css/login.css";
class Login extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="header">
                    <p>HRBank</p>
                </div>
                <div className="head-txt">
                    <p>Login</p>
                </div>
                <div className="login-error" id="hide">
                    <img src="../../Img/warning.png" alt="warning" />
                        <p>Invalid Username or Password</p>
                </div>
                <div className="login-form">
                    <form action="../../login.php" method="POST">
                        <div className="email">
                            <input type="email" name="email" id="email" placeholder="Email" />
                        </div>
                        <div className="passwd">
                            <input type="password" name="password" id="password" placeholder="Password" />
                        </div>
                        <div className="login-btn">
                            <button type="submit">Login</button>
                        </div>
                        <div className="new-user">
                            <p>Don't have an account? <span><a href="../index.html">Create account</a></span></p>
                        </div>
                    </form>
                </div>
            </React.Fragment>
        );
    }
}

export default Login;