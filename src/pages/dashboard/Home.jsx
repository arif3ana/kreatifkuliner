import axios from "axios";
import React, { useEffect } from "react";

const Home = () => {
    const cookies = document.cookie.split(';');
    const accessToken = cookies.find((cookie) => cookie.startsWith("accessToken="))?.split('=')[1];
    const refreshToken = cookies.find((cookie) => cookie.startsWith(" refreshToken="));

    console.log(accessToken);
    console.log(refreshToken);
    axios.get("http://localhost:3000/v1/user/food", {
        headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Cookie": refreshToken,
            "Content-Type": "application/json"
        }
    }).then((response) => {
        console.log(response);
    }).catch((error) => {
        console.log(error);
    })
    return <h1>Halllo everynyan</h1>
}
export default Home;