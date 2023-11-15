import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import Navbar from "../../components/Navbar";
import SecondFooter from "../../components/secondFooter";
import Input from "../../components/atom/input";
import InputTextarea from "../../components/atom/inputTextarea";
import Swal from "sweetalert2";
import Loader from "../../components/atom/loader";
import "../../scss/page/add&edit.scss";

const Edit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [errorMsg, setErrorMsg] = useState();
    const [Loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState({
         strImage: '',
         image: null,
     });

    const { myData } = useSelector((state) => state.myrecipe);
    const dataUpdate = myData.filter((data) => data._id === id);

    // const [newInstruction, setNewInstruction] = useState(Array.from({ length: dataUpdate[0].instructions.length }, () => ({ img: null, step: '' })))

    // state untuk menghandle form
    const [formState, setFormState] = useState({
        name: '',
        description: '',
        image: null, 
        ingredients: [''],
        instructions: [{ img: null, step: '' }] 
    });

    // memasukan semua data yang akan di update ke formstate
    useEffect(() => {
        const lastData = dataUpdate[0]; 
        setFormState({
            ...formState,
            name: lastData.name,
            description: lastData.description,
            ingredients: lastData.ingredients,
            instructions: lastData.instructions.map((instruc) => ({
                img: instruc.img,
                step: instruc.step
            })),
        });
    
        setImagePreview({ strImage: lastData.image });
    }, []);

    const handleImage = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        setFormState({...formState, image: file})
        const reader = new FileReader();

        reader.onloadend = () => {
            const imageData = reader.result;
            setImagePreview({image: imageData})
        }

        if (file) {
            reader.readAsDataURL(file);
        }
    }

    const onHandleChange = (e, index, field) => {
        const {name, value, files} = e.target
        if(name === "name") {
            setFormState({...formState, name: value});
        }
        if (name === "description") {
            setFormState({...formState, description: value});
        }
        if (name === "ingredients[]") {
            const list = [...formState.ingredients];
            list[index] = value;
            setFormState({...formState, ingredients: list})
        }
        if (name === "instructions[]") {
            const list = [...formState.instructions];
            if (field === 'step') {
                list[index].step = value
            }
            if(field === 'img' && files.length > 0) {
                list[index].img = files[0]
            }
            setFormState({...formState, instructions: list});
        }
    }

    const addInputIngredient = () => {
        const list = [...formState.ingredients];
        list.push('');
        setFormState({ ...formState, ingredients: list });
    };
    
    const removeInputIngredient = (index) => {
        const list = [...formState.ingredients];
        if (list.length == 1) {
            return false
        }
        list.splice(index, 1);
        setFormState({ ...formState, ingredients: list });
    };
    
    const addInputInstruction = () => {
        const list = [...formState.instructions];
        list.push({ img: null, step: '' });
        setFormState({ ...formState, instructions: list });
    };
    
    const removeInputInstruction = () => {
        const list = [...formState.instructions];
        const lastData = dataUpdate[0]
        if (list.length == lastData.instructions.length ) {
            return false
        }
        list.pop();
        setFormState({ ...formState, instructions: list });
    };

    const handleSubmit = async (e, id) => {
        setLoading(true)
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', formState.name);
        formData.append('description', formState.description);
        formData.append('image', formState.image);
        formState.ingredients.forEach((ingred, index) => {
            formData.append(`ingredients[${index}]`, ingred)
        })
        formState.instructions.forEach((instruc, index) => {
            formData.append(`instructions[${index}][step]`, instruc.step);
            if (typeof instruc.img === 'string') {
                formData.append(`instructions[${index}][img]`, instruc.img);
            }
            if(typeof instruc.img === 'object') {
                formData.append(`img`, instruc.img);
            }
        })

        try {
            const res = await axios.put(`${import.meta.env.VITE_APP_BASE_URL}/v1/user/food/update/${id}`, formData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            setMessage(res.data.message);
            setTimeout(() => {
                setLoading(false);
                navigate('/dashboard/myrecipe');
            }, 1000)
        } catch (error) {
            setErrorMsg(error.response.data.data);
            setLoading(false);
            setTimeout(() => {
                setErrorMsg(null);
            }, 3000);
        }
    }

    // toast sweetaler success
    const alertToast = (msg) => {
        const Toast = Swal.mixin({
           toast: true,
           position: "top-end",
           showConfirmButton: false,
           timer: 3000,
           timerProgressBar: true,
           didOpen: (toast) => {
             toast.onmouseenter = Swal.stopTimer;
             toast.onmouseleave = Swal.resumeTimer;
           }
         });
         Toast.fire({
            icon: "success",
            title: msg
        })
    }

    // untuk memanggil sweetalert success
    message && alertToast(message); 

    return (
        <>
            <Navbar />
            <div className="container add-recipe">
                {
                errorMsg && (
                <div className={`alert alert-danger`} role="alert">
                    <ul>
                        {errorMsg.map((err, index) => (
                            <li key={index}>{err.msg}</li>
                        ))}
                    </ul>
                </div>
                )
                }
                {Loading && (<div className="loader-box"><Loader /></div>)}
                <form className="mt-3" onSubmit={(e) => handleSubmit(e, id)}>
                    <div className="main-post">
                        <h2 className="mb-4">01 ~ Food Name & Description</h2>
                        {/* input main image */}
                        <div className="main-image mb-3">
                            <div className="input-group">
                                <label className="input-group-text" htmlFor="inputGroupFile01">New Image</label>
                                <input className="form-control" id="inputGroupFile01" type="file" name="image" onChange={handleImage}/>
                            </div>
                            <div className="preview">
                                {imagePreview.image != null ? (
                                    <img src={imagePreview.image} alt="preview image" />
                                ) : (<img src={`${import.meta.env.VITE_APP_BASE_URL}/${imagePreview.strImage}`} alt="preview image" />)}
                            </div>
                        </div>

                        <Input 
                        divClassName={'mb-3 input-name'}
                        name={'name'}
                        type={'text'}
                        placeholder={'Food Name'}
                        value={formState.name}
                        handleChange={onHandleChange}
                        required
                        />
                        <InputTextarea 
                        divClassName={'mb-3 input-description'}
                        name={'description'}
                        placeholder={'Descriptions ~ minimum 200 characters'}
                        row={5}
                        value={formState.description}
                        handleChange={onHandleChange}
                        required
                        />
                    </div>


                    <div className="second-post">
                        <h2 className="mb-4">02 ~ Food Ingredient & Instruction</h2>
                        <div className="input-recipe">
                            <div className="ingredients">
                                <h3 className="mb-4">~ Ingredients</h3>
                                <ol id="olIngredient">
                                    {formState.ingredients.map((ingred, index) => (
                                    <li key={index}>
                                    <Input 
                                    divClassName={'mb-3 ingred-list'}
                                    name={'ingredients[]'}
                                    type={'text'}
                                    placeholder={'Ingredients'}
                                    value={ingred}
                                    handleChange={(e) => onHandleChange(e, index)}
                                    required
                                    />
                                    </li>
                                    ))}
                                </ol>
                                <div className="oprator-ingredient">
                                    <button type="button" className="btn substraction" onClick={removeInputIngredient}> - </button>
                                    <button type="button" className="btn add" onClick={addInputIngredient}> + </button>
                                </div>
                            </div>

                            <div className="instructions">
                                <h3 className="mb-4">~ Instructions</h3>
                                <ol>
                                    {formState.instructions[0] && formState.instructions.map((instruc, index) => (
                                    <li key={index} className="mb-3">
                                    {instruc.img === null || typeof instruc.img != 'string' ? null : (
                                        <img src={`http://localhost:3000/${instruc.img}`} alt="preview image" className="img-preview"/>
                                    )}
                                    <div className="input-group">
                                        <label className="input-group-text" htmlFor="inputGroupFile02">New Image</label>
                                        <input className="form-control" id="inputGroupFile02" type="file" name="instructions[]" onChange={(e) => onHandleChange(e, index, 'img')}/>
                                    </div>
                                    <InputTextarea 
                                    divClassName={'intruct-desc'}
                                    name={'instructions[]'}
                                    placeholder={'Instructions'}
                                    value={instruc.step}
                                    handleChange={(e) => onHandleChange(e, index, 'step')}
                                    required
                                    />
                                    </li>
                                    ))}
                                </ol> 
                                <div className="oprator-instruction">
                                    <button type="button" className="btn substraction" onClick={removeInputInstruction}> - </button>
                                    <button type="button" className="btn add" onClick={addInputInstruction}> + </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="form-btn mt-3">
                        <button type="submit" className="btn-submit">Add Recipe</button>
                    </div>
                </form>
            </div>
            <SecondFooter /> 
        </>
    )
}

export default Edit;