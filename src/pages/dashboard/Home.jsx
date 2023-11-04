import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { homeContent } from "../../utils/reducer/homeReducer";
import Navbar from "../../components/Navbar";
import SecondFooter from "../../components/secondFooter";
import FirstCard from "../../components/firstCard";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import "../../scss/page/dashboardhome.scss";

const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {loginData} = useSelector((state) => state.login);
    
    // const accessToken = loginData.accessToken;

    useEffect(() => {
        const access = Cookies.get('accessToken');
        const refresh = Cookies.get('refreshToken');

        // pengecekan accessToken dan refreshToken
        if (!access || !refresh) {
            navigate('/')
            Cookies.remove('accessToken') 
        } else {
            setTimeout(() => {
                dispatch(homeContent({access}))
            }, 1000);
        }
        

        const accessToken = access ? access : loginData.accessToken;
        !refresh ? null : Cookies.set('accessToken', accessToken, {path: "/", expires: new Date(Date.now() + 5 * 60 * 1000)});

    }, [])

    const {homeData} = useSelector((state) => state.home);
    console.log(homeData);
    return (
    
        <>
        <Navbar />
        <div className="container home-content">
            {!homeData.msg ? homeData.map(data => (
                <FirstCard 
                className="home-card"
                key={data._id}
                alt={data.name} 
                title={data.name} 
                image={`http://localhost:3000/${data.image}`} 
                description={data.description}
                date={data.createdAt}
                id={data._id} />
            )) : <p>{homeData.msg}</p>}
        </div>
        <SecondFooter />
        </>

    )
}
export default Home;