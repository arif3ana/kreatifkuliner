import React, { useEffect, useState } from "react";
import FirstCard from "../../components/firstCard";
import { useDispatch, useSelector } from "react-redux";
import {setFoodData} from "../../utils/reducer/firstPageReducer";
import Header from "../../layouts/Header";
import "../../scss/page/home.scss";
import Footer from "../../layouts/Footer";
import { Link } from "react-router-dom";
import Loader from "../../components/atom/loader";

const Home = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setFoodData())
    }, [dispatch])

    const {foodData, isLoading, error} = useSelector((state) => state.food);
    
    return (
        <>
        <Header/>
        <div className="container mt-4">
            <div className="title-content">
                <h2 className="mb-3">Blog Kuliner Baru</h2>
                <p>Membuat makanan yang lezat dan memuaskan bisa sangat menyenangkan!</p>
            </div>
            {error && (<div className="container text-center"><p className="text-body-secondary">{error}</p></div>)}
            {isLoading && (<div className="container text-center"><Loader /></div>)}
            <div className="card-content">
                {foodData.map((food) => (
                    <FirstCard 
                    key={food._id}
                    alt={food.name} 
                    title={food.name} 
                    image={`${import.meta.env.VITE_APP_BASE_URL}/${food.image}`} 
                    description={food.description}
                    date={food.createdAt} 
                    id={food._id} />
                ))}
            </div>
            <div className="text-center mt-5">
            <Link to={'/register'} className="btn btn-primary">Explore more..</Link>
            </div>
        </div>
        <Footer />
        </>
    )
}

export default Home