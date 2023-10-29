import React from "react";
import "../scss/layout/footer.scss";

const Footer = () => {
    return (
        <footer className="footer mt-5">
            <div className="container">
                <img src="" alt="" />
                <p>&copy; {new Date().getFullYear()} kreatifkuliner</p>
            </div>
        </footer>
    )
}

export default Footer;