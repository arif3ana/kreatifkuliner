import React from "react";

const InputPassword = (props) => {
    const {className, handleChange} = props;
    const eyeHandler = (e) => {
        const input = document.getElementById("key");
        if (input.type == "password") {
            return input.type = "text";
        }
        return input.type = "password";
    }
     return (
    <div className={`input-group flex-nowrap ${className}`}>
        <input 
        type="password" 
        className="form-control" 
        placeholder="Password" 
        aria-label="Password" 
        id="key" 
        name="password" 
        onChange={handleChange}/>
        <span className="input-group-text" onClick={eyeHandler}><i className="bi bi-eye-fill"/></span>
    </div>
    )
}

export default InputPassword;