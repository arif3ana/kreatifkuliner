import React, { useEffect, useState } from "react";
import FirstCard from "../../components/firstCard";
import { useDispatch, useSelector } from "react-redux";
import {setFoodData} from "../../utils/reducer/firstPageReducer";
import Header from "../../layouts/Header";
import "../../scss/page/home.scss";
import Footer from "../../layouts/Footer";
import { Link } from "react-router-dom";

const Home = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setFoodData())
    }, [dispatch])

    const {foodData, isLoading, error} = useSelector((state) => state.food);
    if (isLoading) {
        return <p className="container">loading...</p>
    }
    if (error) {
       return <p className="container">loading...</p>
    }
    
    return (
        <>
        <Header/>
        <div className="container mt-4">
            <div className="title-content">
                <h2 className="mb-3">Blog Kuliner Baru</h2>
                <p>Membuat makanan yang lezat dan memuaskan bisa sangat menyenangkan!</p>
            </div>
            <div className="card-content">
                {foodData.map((food) => (
                    <FirstCard 
                    key={food._id}
                    alt={food.name} 
                    title={food.name} 
                    image={`http://localhost:3000/${food.image}`} 
                    description={food.description}
                    date={food.createdAt} />
                ))}
            </div>
            <div className="text-center mt-5">
            <Link to={'/register'} className="btn btn-primary">Get Started</Link>
            </div>
        </div>
        <Footer />
        </>
    )
}

export default Home