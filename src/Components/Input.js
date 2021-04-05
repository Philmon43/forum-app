import React, { useState } from "react";
import "./input.css";

const Input = ({name, placeholder ,tooltip, data}) => {
    const [val, setVal ] = useState("");
    
    const handleChange = (e) => {
        setVal(e.target.value)
        data(e.target.value)
    }
    return <form>
        <div className={name} data-tooltip={tooltip}>
            <input  value={val} onChange= {handleChange} placeholder={placeholder} />
        </div>
    </form>
}

export default Input;