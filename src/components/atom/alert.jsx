import React from "react";

const Alert = ({type, mainMessage, messageType }) => {
    return (
        <div className={`alert alert-${type}`} role="alert">
            <strong>{messageType}</strong> {mainMessage}
        </div>
    )
}

export default Alert;