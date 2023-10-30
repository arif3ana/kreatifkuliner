import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { homeContent } from "../../utils/reducer/homeReducer";

const Home = () => {
    const dispatch = useDispatch();

    const cookies = document.cookie.split(';');
    const token = cookies.find((cookie) => cookie.startsWith("accessToken="))?.split('=')[1];
    const {loginData} = useSelector((state) => state.login);
    
    const accessToken = loginData.accessToken || token

    useEffect(() => {
        dispatch(homeContent({accessToken}))
    }, [])

    const {homeData} = useSelector((state) => state.home);
    console.log(homeData);

    return <h1>Halllo everynyan</h1>
}
export default Home;