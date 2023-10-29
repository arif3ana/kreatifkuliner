import React from "react";

const Input = 
({
    type, 
    className, 
    name, 
    divClassName, 
    placeholder, 
    handleChange,
}) => {
    return (
    <div className={divClassName}>
        <input 
        type={type}
        className={`form-control ${className}`} 
        name={name}
        placeholder={placeholder} 
        onChange={handleChange}/>
    </div>
    )
}

export default Input;