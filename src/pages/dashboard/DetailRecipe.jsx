import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DateFormat } from "../../middleware/DateFormat";
import Cookies from "js-cookie";
import Navbar from "../../components/Navbar";
import SecondFooter from "../../components/secondFooter";
import "../../scss/page/detail.scss";
import Loader from "../../components/atom/loader";

const DetailRecipe = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const getData = async (access) => {
        const res = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/v1/user/food/${id}`, {
            withCredentials: true,
            headers: {
                'Authorization': access 
            }
        })
        const data = await res.data.data;
        setData(data);
        setLoading(false);
    }

    useEffect(() => {
        setLoading(true);
        const access = Cookies.get('accessToken');
        const refresh = Cookies.get('refreshToken');

        // pengecekan accessToken dan refreshToken
        if (!access || !refresh) {
            navigate('/login')
            Cookies.remove('accessToken')
        } else  {
            getData(access);
        } 

        !refresh ? null : Cookies.set('accessToken', access, {path: "/", expires: new Date(Date.now() + 5 * 60 * 1000)});
    }, [])

    // format tanggal 
    const dateStr = DateFormat(data.createdAt);
    return (
        <>
        <Navbar />
        {loading ? (<div className="loader-box-recipe"><Loader /></div>) : (
        <div className="container detail-recipe">
            <img className="img-detail" src={data.image} alt="image recipe" />
            <h1 className="title-blog">{data.name}</h1>
            <p className="text-body-secondary content-info">By {data.author} | {dateStr}</p>
            <p className="content-blog">{data.description}</p>
            <h3 className="second-title">Ingredients</h3>
            {data && data.ingredients && (
            <ol className="list-ingredients">
            {data.ingredients.map((ingred, index) => (
                <li key={index} className="list">
                    <p className="bahan">{ingred}</p>
                </li>
            ))}
            </ol>
            )}
            <h3 className="third-title">How To Make</h3>
            {data && data.instructions && (
            <div className="list-instruc">
                {data.instructions.map((inst, index) => (
                    <div key={index} className="step">
                        {inst.img ? (<img className="img-detail-step" src={inst.img} alt="image recipe" />) : null}
                        <p className="step-instruc"><strong>{`Step ${index + 1} `}</strong>{inst.step}</p>
                    </div>
                ))}
            </div>
            )}
        </div>
        )}
        <SecondFooter />
        </>
    )
}
export default DetailRecipe;