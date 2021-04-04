import React, { useState } from "react";
import "./input.css";

const Input = ({name, placeholder ,tooltip}) => {
    const [val, setVal ] = useState("")
    return <form>
        <div className={name} data-tooltip={tooltip}>
            <input  value={val} onChange= {e => setVal(e.target.value)} placeholder={placeholder} />
        </div>
    </form>
}

export default Input;