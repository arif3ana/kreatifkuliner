import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { recipeContent, recipeDelete } from "../../utils/reducer/myrecipeReducer";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Navbar from "../../components/Navbar";
import SecondFooter from "../../components/secondFooter";
import FirstCard from "../../components/firstCard";
import Loader from "../../components/atom/loader";
import Swal from "sweetalert2";
import "../../scss/page/myrecipe.scss";

const Myrecipe = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [otentikasi, setOtentikasi] = useState('');

    useEffect(() => {
        const {userId} = JSON.parse(localStorage.getItem('USER'));
        const access = Cookies.get('accessToken');
        const refresh = Cookies.get('refreshToken');
        // pengecekan accessToken dan refreshToken
        if (!access || !refresh) {
            navigate('/')
            Cookies.remove('accessToken')
        } else {
            setTimeout(() => {
                dispatch(recipeContent({userId, access}))
            }, 1000)
        }
        
        setOtentikasi(access);
        !refresh ? null : Cookies.set('accessToken', access, {path: "/", expires: new Date(Date.now() + 5 * 60 * 1000), sameSite: 'None', secure: true});
    }, [])

    const { myData, isLoading, error } = useSelector((state) => state.myrecipe);
    const [data, setData] = useState(myData);

    useEffect(() => {
        setData(myData)
    }, [myData]);

    function onDelete(id) {
        Swal.fire({
            title: "Apa kamu yakin?",
            text: "Apakah kamu ingin menghapus ini ?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then(async (result) => {
              if (result.isConfirmed) {
                await dispatch(recipeDelete({id, otentikasi}));
                const result = myData.filter((recipe) => recipe._id !== id);
                setData(result);
                }
            }); 
        }
        
    return (
        <>
        <Navbar />
        {isLoading && (<div className="loader-box"><Loader /></div>)}
            <div className="container card-recipe">

                {!error ? data.map((recipe) => 
                (
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
                )
                ) : (<p className="text-center text-body-secondary mt-5">{error}</p>) }
                <p className="text-body-secondary">jumlah Post: {data.length}</p>
            </div>
        <SecondFooter />
        </>
    )

}

export default Myrecipe;