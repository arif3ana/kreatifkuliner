import React from "react";
import "../scss/component/firstcard.scss"
import { Link } from "react-router-dom";
import {recipeDelete} from "../utils/reducer/myrecipeReducer";
import { useDispatch } from "react-redux";
const FirstCard = (props) => {
    const { className, alt, image, title, date, description, id, handleDelete } = props;
    const dispatch = useDispatch();

    return (
        <div className={`card ${className}`}>
            <img src={image} className="card-img-top card-image" alt={alt}/>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text"><small className="text-body-secondary">{date}</small></p>
                <p className="card-text">{description.slice(0, 200)}</p>
                <div className="card-btn">
                    {
                    location.pathname == "/dashboard/myrecipe" ? (
                        <>
                            <Link to={`/dashboard/edit/${id}`} className="btn btn-link">Edit</Link>
                            <button onClick={() => handleDelete(id)} className="btn btn-link">Delete</button>
                        </>
                    ) : null 
                    }
                    <Link to={`/dashboard/recipe/${id}`} className="btn btn-link">Read more...</Link>
                </div>
            </div>
        </div>
    )
}

export default FirstCard;