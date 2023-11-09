import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { recipeContent, recipeDelete } from "../../utils/reducer/myrecipeReducer";
import Cookies from "js-cookie";
import Navbar from "../../components/Navbar";
import SecondFooter from "../../components/secondFooter";
import FirstCard from "../../components/firstCard";
import Loader from "../../components/atom/loader";
import "../../scss/page/myrecipe.scss";

const Myrecipe = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        const access = Cookies.get('accessToken');
        const refresh = Cookies.get('refreshToken');
        const {userId} = JSON.parse(localStorage.getItem('USER'));

        // pengecekan accessToken dan refreshToken
        if (!access || !refresh) {
            navigate('/')
            Cookies.remove('accessToken')
        } else {
            setTimeout(() => {
                dispatch(recipeContent({userId}))
            }, 500)
        }
        
        !refresh ? null : Cookies.set('accessToken', access, {path: "/", expires: new Date(Date.now() + 5 * 60 * 1000)});
    }, [])

    const { myData, isLoading } = useSelector((state) => state.myrecipe);
    const [data, setData] = useState(myData);

    useEffect(() => {
        setData(myData)
    }, [myData]);

    function onDelete(id) {
       dispatch(recipeDelete({id}))
       const result = myData.filter((recipe) => recipe._id !== id);
        setData(result);
    }

    return (
        <>
        <Navbar />
        {isLoading && (<div className="loader-box"><Loader /></div>)}
            <div className="container card-recipe">
                {!data.msg ? data.map((recipe) => (
                    <FirstCard 
                    className="recipe-content"
                    key={recipe._id}
                    alt={recipe.name} 
                    title={recipe.name} 
                    image={`${import.meta.env.VITE_APP_BASE_URL}/${recipe.image}`} 
                    description={recipe.description}
                    date={recipe.createdAt}
                    id={recipe._id} 
                    handleDelete={() => onDelete(recipe._id)} />
                )) : (<p className="text-center text-body-secondary">{data.msg}</p>) }
            </div>
        <SecondFooter />
        </>
    )

}

export default Myrecipe;