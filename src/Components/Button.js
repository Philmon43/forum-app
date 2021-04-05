import React from "react";
import "./button.css";

const Button = ({name, type, handleButtonClick}) => {
    return <button className={type}onClick={handleButtonClick}>
                {name}
           </button>
}

export default Button;