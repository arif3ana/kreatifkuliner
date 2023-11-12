import React from "react";
import "../../scss/component/input.scss";
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
    <div className={`${divClassName} input-div`}>
        <input 
        type={type}
        className={`form-control ${className}`} 
        name={name}
        placeholder={placeholder} 
        onChange={handleChange}
        {...rest}/>
        {location.pathname == '/dashboard' && (<span className="input-group-text" id="basic-addon1"><i className="bi bi-search" /></span>)}
    </div>
    )
}

export default Input;