import React from "react";

const InputTextarea = 
({
    className, 
    name, 
    divClassName, 
    placeholder,
    row, 
    handleChange,
    ...rest
}) => {
    return (
    <div className={divClassName}>
        <textarea 
        className={`form-control ${className}`} 
        placeholder={placeholder}
        name={name}
        onChange={handleChange}
        rows={row}
        {...rest} />
    </div>
    )
}

export default InputTextarea;