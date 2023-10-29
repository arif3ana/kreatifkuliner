import React from "react";
import "../scss/component/firstcard.scss"
const FirstCard = (props) => {
    const { className, alt, image, title, date, description } = props;
    return (
        <div className={`card ${className}`}>
            <img src={image} className="card-img-top card-image" alt={alt}/>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text"><small className="text-body-secondary">{date}</small></p>
                <p className="card-text">{description.slice(0, 130)}</p>
                <a href="#" className="btn btn-primary card-btn">Read more...</a>
            </div>
        </div>
    )
}

export default FirstCard;