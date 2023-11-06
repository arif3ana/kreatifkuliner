import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { recipeContent, recipeDelete } from "../../utils/reducer/myrecipeReducer";
import Cookies from "js-cookie";
import Navbar from "../../components/Navbar";
import SecondFooter from "../../components/secondFooter";
import FirstCard from "../../components/firstCard";
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
            }, 1000)
        }
        
        !refresh ? null : Cookies.set('accessToken', access, {path: "/", expires: new Date(Date.now() + 5 * 60 * 1000)});
    }, [onDelete])

            
    function onDelete(id) {
       dispatch(recipeDelete({id}))
    }

    const { myData } = useSelector((state) => state.myrecipe);


    return (
        <>
        <Navbar />
            <div className="container card-recipe">
                {!myData.msg ? myData.map((recipe) => (
                    <FirstCard 
                    className="recipe-content"
                    key={recipe._id}
                    alt={recipe.name} 
                    title={recipe.name} 
                    image={`http://localhost:3000/${recipe.image}`} 
                    description={recipe.description}
                    date={recipe.createdAt}
                    id={recipe._id} 
                    handleDelete={() => onDelete(recipe._id)} />
                )) : <p>{myData.msg}</p> }
            </div>
        <SecondFooter />
        </>
    )

}

export default Myrecipe;