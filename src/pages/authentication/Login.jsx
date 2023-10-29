import React from "react";
import "../../scss/page/login.scss";
import { Link } from "react-router-dom";

const Login = () => {
    return (
        <div className="login">
        <div className="form-login">
            <h2 className="text-center">Log in</h2>
            <form action="" method="post" className="mb-5">
                <div className="form-floating mb-3">
                    <input type="email" className="form-control" id="floatingInput" name="email" placeholder="email@gmail.com"/>
                    <label htmlFor="floatingInput">Email</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="password" className="form-control" id="floatingPassword" name="password" placeholder="password"/>
                    <label htmlFor="floatingPassword">Password</label>
                </div>
                <div className="text-end">
                <button type="submit" className="btn btn-primary">Log in</button>
                </div>
            </form>
            <div className="text-center">
                <Link to={'/register'}>Belum Registrasi? ---</Link>
            </div>
        </div>
    </div>
    )
}

export default Login;