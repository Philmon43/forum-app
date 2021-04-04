import React from "react";
import Input from "../Input";
import "./login.css";
import Button from "../Button";

const LogIn = ({cancelModal}) => {

    const onLogInClick = () => {
        console.log("send data")
    }

    return <div className="login">
            <h3>Log in</h3>
            <Input name="input" placeholder="Enter your name"  tooltip="Name: "/>
            <Input name="input" placeholder="Enter your email"  tooltip="Email: "/>
            <Input name="input" placeholder="Enter your password"  tooltip="password: "/>
            <Button
                name="LogIn" 
                type="LogIn"
                handleButtonClick={onLogInClick}
                />
            </div>
}

export default LogIn