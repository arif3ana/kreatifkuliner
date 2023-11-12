import React from "react";
import '../../scss/component/inputTextarea.scss';
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
    <div className={`${divClassName} input-textarea`}>
        <textarea 
        className={`form-control ${className} textarea`} 
        placeholder={placeholder}
        name={name}
        onChange={handleChange}
        rows={row}
        {...rest} />
    </div>
    )
}

export default InputTextarea;