import React from "react";
import "../../../utils/css/signup.css";

export const Signup = () => {
    return (
        <div className="signupWrap">
            <div className="signupHeader">
                <p>HRBank</p>
            </div>
            <div className="head-txt">
                <p>CREATE ACCOUNT</p>
            </div>
            <div className="signup">
                <form method="POST">
                    <div className="first-name">
                        <input type="text" name="Firstname" id="firstName" placeholder="First name" onKeyUp="validateFirstName()" required />
                            <span id="firstNameError"></span>
                    </div>
                    <div className="last-name">
                        <input type="text" name="Lastname" id="lastName" placeholder="Last name" onKeyUp="validateLastName()" required />
                            <span id="lastNameError"></span>
                    </div>
                    <div className="user-name">
                        <input type="text" name="Username" id="username" placeholder="Username" onKeyUp="validateUsername()" required />
                            <span id="usernameError"></span>
                    </div>
                    <div className="email-id">
                        <input type="email" name="Email" id="email" placeholder="example@email.com" onKeyUp="validateEmail()" required />
                            <span id="emailError"></span>
                    </div>
                    <div className="passwd">
                        <input type="password" name="Password" id="password" placeholder="Password" onKeyUp="validatePassword()" required />
                            <span id="passwordError"></span>
                    </div>
                    <div className="retype-passwd">
                        <input type="password" name="Confirm-password" id="retype-password" placeholder="Confirm Password" onKeyUp="validateRetypePassword()" required />
                            <span id="retypePasswordError"></span>
                    </div>
                    <div className="gender">
                        <label for="Gender">Male : </label>
                        <input type="radio" name="Gender" value="1" id="male" />
                        <label for="Gender">Female : </label>
                        <input type="radio" name="Gender" value="2" id="female" />
                    </div>
                    <div className="age">
                        <select name="Age" id="select-age">
                            <option value="Age">Age</option>
                            <option value="17">17</option>
                            <option value="18">18</option>
                            <option value="19">19</option>
                            <option value="20">20</option>
                            <option value="21">21</option>
                            <option value="22">22 or above</option>
                        </select>
                    </div>
                    <div className="submit-btn">
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
}