import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { homeContent } from "../../utils/reducer/homeReducer";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Navbar from "../../components/Navbar";
import SecondFooter from "../../components/secondFooter";
import FirstCard from "../../components/firstCard";
import Loader from "../../components/atom/loader";
import Input from "../../components/atom/input";
import "../../scss/page/dashboardhome.scss";

const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {loginData} = useSelector((state) => state.login);
    
    // const accessToken = loginData.accessToken;
    useEffect(() => {
        const access = Cookies.get('accessToken');
        const refresh = Cookies.get('refreshToken');
        console.log(refresh);
        // pengecekan accessToken dan refreshToken
        if (!access || !refresh) {
            navigate('/')
            Cookies.remove('accessToken') 
        } else {
            setTimeout(() => {
                dispatch(homeContent(access))
            }, 500);
        }
    
        const accessToken = access ? access : loginData.accessToken;
        !refresh ? null : Cookies.set('accessToken', accessToken, {path: "/", expires: new Date(Date.now() + 5 * 60 * 1000), sameSite: 'None', secure: true});

    }, [])

    const {homeData, isLoading} = useSelector((state) => state.home);
    const [searchTerm, setSearchTerm] = useState('');
    const [data, setData] = useState(homeData);

    useEffect(() => {
        setData(homeData)
    }, [homeData]);

    const onSearch = (e) => {
        const search = e.target.value;
        setSearchTerm(search)

        const result = homeData.filter((recipe) => recipe.name.toLowerCase().includes(search.toLowerCase()));
        setData(result);
    }
    
    return (
        <>
        <Navbar />
        <Input 
        divClassName={'container input-group search-form mb-5 mt-3'}
        className={'search'}
        placeholder={'Search Recipe . . .'}
        aria-label="Search" 
        aria-describedby="basic-addon1" 
        handleChange={onSearch}
        value={searchTerm}
        />
        {isLoading && (<div className="loader-box"><Loader /></div>)}
        <div className="container home-content">
            {!data.msg ? data.map(data => (
                <FirstCard 
                className="home-card"
                key={data._id}
                alt={data.name} 
                title={data.name} 
                image={`${import.meta.env.VITE_APP_BASE_URL}/${data.image}`} 
                description={data.description}
                date={data.createdAt}
                id={data._id} />
            )) : (<p className="text-center text-body-secondary">{data.msg}</p>)}
            {data.length == 0 && (<p className="text-center text-body-secondary">Resep "{searchTerm}" tidak di temukan</p>)}
        </div>
        <SecondFooter />
        </>

    )
}
export default Home;