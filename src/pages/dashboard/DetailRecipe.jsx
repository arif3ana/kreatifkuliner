import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import Navbar from "../../components/Navbar";
import SecondFooter from "../../components/secondFooter";
import "../../scss/page/detail.scss";

const DetailRecipe = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState([])


    const getData = async () => {
        const res = await axios.get(`http://localhost:3000/v1/user/food/${id}`, {withCredentials: true})
        const data = await res.data.data;
        setData(data)
    }

    useEffect(() => {
        const access = Cookies.get('accessToken');
        const refresh = Cookies.get('refreshToken');

        // pengecekan accessToken dan refreshToken
        if (!access || !refresh) {
            navigate('/login')
            Cookies.remove('accessToken')
        } else  {
            getData()
        } 


        !refresh ? null : Cookies.set('accessToken', access, {path: "/", expires: new Date(Date.now() + 5 * 60 * 1000)});
    }, [])


    console.log(data);
    return (
        <>
        <Navbar />
        <div className="container detail-recipe">
            <img className="img-detail" src={`http://localhost:3000/${data.image}`} alt="image recipe" />
            <h1>{data.name}</h1>
            <p>author: {data.author} | {data.createdAt}</p>
            <p>{data.description}</p>
            <h3>Ingredients</h3>
            {data && data.ingredients && (
            <ul>
            {data.ingredients.map((ingred) => (
                <li>{ingred}</li>
            ))}
            </ul>
            )}
            <h3>How To Make</h3>
            {data && data.instructions && (
            <ul>
                {data.instructions.map((inst) => (
                    <li>
                        {inst.img ? (<img className="img-detail" src={`http://localhost:3000/${inst.img}`} alt="image recipe" />) : null}
                        <p>{inst.step}</p>
                    </li>
                ))}
            </ul>
            )}
        </div>
        <SecondFooter />
        </>
    )
}
export default DetailRecipe;