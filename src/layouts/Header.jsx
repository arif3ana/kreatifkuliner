import React from "react";
import { Link } from "react-router-dom";
import "../scss/layout/header.scss";


const Header = () => {
    return (
        <>
        <header className="navbar fixed-top">
            <div className="container">
                <span className="navbar-text">
                Kreatif Kuliner
                </span>
                <div className="auth-list">
                    <Link to="/register" className="btn-signup">Sign Up</Link>
                    <Link to="/login" className="btn-signin">Sign In</Link>
                </div>
            </div>
        </header>

        <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <div className="container hero">
                        <div className="header-tagline">
                            <h1>Selamat Datang di Kreatif kuliner</h1>
                            <p>Tempat sumber inspirasi terbaik untuk segala jenis resep dan panduan memasak kreatif!</p>
                        </div>
                    </div>
                </div>
                <div className="carousel-item">
                     <div className="container hero">
                        <div className="header-tagline">
                            <h1>Kreatif Kuliner</h1>
                            <p>Dari masakan sehari-hari hingga hidangan spesial, eksplorasi beragam resep lezat dan bagikan kreasi masakan kamu di Kreatifkuliner!</p>
                        </div>
                    </div>
                </div>
                <div className="carousel-item">
                    <h1 className="text-center"></h1>
                    <div className="container hero">
                        <div className="header-tagline">
                            <h1>Bagikan resep masakan kamu! </h1>
                            <p>Bagikan resep, cerita, dan foto makanan favorit kamu di Kreatifkuliner! </p>
                        </div>
                    </div>
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
        </>
    )
}

export default Header;