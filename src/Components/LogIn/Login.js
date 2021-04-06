import React, { useEffect, useState } from "react";
import Input from "../Input";
import "./login.css";
import Button from "../Button";
import { isEmail, isAlphanumeric } from "validator";
import Axios from "../../Api/Axios";

const LogIn = ({onUserLogIn}) => {
    const [userName, setUsername ] = useState("");
    const [userEmail, setUserEmail ] = useState("");
    const [userPassword, setUserPassword ] = useState("");
    const [userData, setUserdata] = useState(null);
    const [error, setError ] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            const {data} = await Axios.get("/users");
            setUserdata(data)
        }
        fetchData()
    },[])

    const authenticate = async () => {
        const user = {
            name: userName,
            email: userEmail,
            password: userPassword
        }
       try{
            if(!isAlphanumeric(userPassword)){
                // eslint-disable-next-line no-throw-literal
                throw("Your password must be alphabet and numbers only!");
            }else if(!isEmail(userEmail)){
                // eslint-disable-next-line no-throw-literal
                throw("Please check Your email");
            }else if(userData.filter(u => u.email === userEmail).length > 0){
                if(userData.filter(u => u.email === userEmail&& u.password === userPassword).length > 0){
                    localStorage.setItem("user", JSON.stringify(userData.filter(u => u.email === userEmail)))
                    onUserLogIn()
                }else{
                    // eslint-disable-next-line no-throw-literal
                    throw("User Exits please login with password");
                }
            }else{
                const {data} = await Axios.post("/users", user);
                localStorage.setItem("user", JSON.stringify(data))
                onUserLogIn()
            }

            //else if(userData){
            //     const userMatch = userData.filter(u => u.email === userEmail&& u.password === userPassword)
            //     console.log(userMatch)
            //     if(!userMatch.length > 0){
            //         localStorage.setItem("user", JSON.stringify(userMatch))
            //         onUserLogIn()
            //     }else{
            //         // eslint-disable-next-line no-throw-literal
            //         throw("User Exits please login with password");
            //     }
            // }else{
            //     const {data} = await Axios.post("/users", user);
            //     localStorage.setItem("user", JSON.stringify(data))
            //     onUserLogIn()
            // }
       }catch(e){
           setError(e)
       }
    }
    
    return <div className="login">
            <h3>Log in</h3>
            <Input data={(val) => setUsername(val)} name="input" placeholder="Enter your name"  tooltip="Name: "/>
            <Input data={(val) => setUserEmail(val)} name="input" placeholder="Enter your email"  tooltip="Email: "/>
            <Input data={(val) => setUserPassword(val)} name="input" placeholder="Enter your password"  tooltip="password: "/>
            <Button
                name="LogIn" 
                type="write"
                handleButtonClick={authenticate}
                />
            {error&&<p className="error">{error}</p>}
            </div>
}

export default LogIn