import React from "react";

const Input = 
({
    type, 
    className, 
    name, 
    divClassName, 
    placeholder, 
    handleChange,
    ...rest
}) => {
    return (
    <div className={divClassName}>
        <input 
        type={type}
        className={`form-control ${className}`} 
        name={name}
        placeholder={placeholder} 
        onChange={handleChange}
        {...rest}/>
        
    </div>
    )
}

export default Input;