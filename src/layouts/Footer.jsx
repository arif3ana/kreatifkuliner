import React from "react";
import "../scss/layout/footer.scss";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="footer mt-5">
            <div className="container">
                <div className="footer-content">
                    <div className="logo">
                        <h3>KreatifKuliner</h3>
                        <p>Buat resep kreatif dan <br /> bagikan resep anda</p>
                    </div>
                    <div className="link">
                        <h6 className="mb-3">Quick Link</h6>
                        <div className="list">
                            <Link to={'/register'}>Sign Up</Link>
                            <Link to={'/login'}>Sign In</Link>
                            <a href="#">Privacy</a>
                            <a href="#">Terms & Conditions</a>
                        </div>
                    </div>
                </div>
                <hr />
                <p className="copyright">&copy; {new Date().getFullYear()} kreatifkuliner. All Rights Reserved</p>
            </div>
        </footer>
    )
}

export default Footer;