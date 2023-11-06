import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import SecondFooter from "../../components/secondFooter";
import Input from "../../components/atom/input";
import InputTextarea from "../../components/atom/inputTextarea";
import "../../scss/page/add.scss";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const Edit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { myData } = useSelector((state) => state.myrecipe);
    const dataUpdate = myData.filter((data) => data._id === id);

    const [imagePreview, setImagePreview] = useState({
        strImage: dataUpdate[0].image,
        image: null,
    });
    const [message, setMessage] = useState('');
    const [errorMsg, setErrorMsg] = useState();

    // state untuk menghandle form
    const [formState, setFormState] = useState({
        name: dataUpdate[0].name,
        description: dataUpdate[0].description,
        image: null,
        ingredients: dataUpdate[0].ingredients,
        instructions: [...dataUpdate[0].instructions]
    });

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
    
    const removeInputInstruction = (index) => {
        const list = [...formState.instructions];
        if (list.length == 1) {
            return false
        }
        list.splice(index, 1);
        setFormState({ ...formState, instructions: list });
    };

    const handleSubmit = async (e, id) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append('name', formState.name);
        formData.append('description', formState.description);
        formData.append('image', formState.image);
        formState.ingredients.forEach((ingred, index) => {
            formData.append(`ingredients[${index}]`, ingred)
        })
        formState.instructions.forEach((instruc, index) => {
            formData.append(`instructions[${index}][step]`, instruc.step);
            if(instruc.img) {
                formData.append(`img`, instruc.img);
            }
        })

        try {
            const res = await axios.put(`http://localhost:3000/v1/user/food/update/${id}`, formData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            setMessage(res.data.message);
            
            setTimeout(() => {
                navigate('/dashboard/myrecipe');
            }, 1000)
        } catch (error) {
            setErrorMsg(error.response.data.data);
        }
    }

    return (
        <>
            <Navbar />
            <div className="container add-recipe">
                {
                    message && (
                    <div className="alert alert-success sticky-top alert-dismissible fade show" role="alert">
                        <strong>Success!</strong> {message}
                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                    )
                }

                {
                errorMsg && (
                <div className="alert alert-danger sticky-top alert-dismissible fade show" role="alert">
                    <ul>
                        {errorMsg.map((err, index) => (
                            <li key={index}>{err.msg}</li>
                        ))}
                    </ul>
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
                )
                }

                <form className="mt-3" onSubmit={(e) => handleSubmit(e, id)}>
                    <div className="main-post">
                        <h2 className="mb-4">01 ~ Food Name & Description</h2>
                        {/* input main image */}
                        <div className="main-image mb-3">
                            <div className="input-group">
                            <label className="input-group-text" htmlFor="inputGroupFile01">Image</label>
                                <input className="form-control" id="inputGroupFile01" type="file" name="image" onChange={handleImage}/>
                            </div>
                            <div className="preview">
                                {imagePreview.image != null ? (
                                    <img src={imagePreview.image} alt="preview image" />
                                ) : (<img src={`http://localhost:3000/${imagePreview.strImage}`} alt="preview image" />)}
                            </div>
                        </div>

                        <Input 
                        divClassName={'mb-3'}
                        name={'name'}
                        type={'text'}
                        placeholder={'Food Name'}
                        value={formState.name}
                        handleChange={onHandleChange}
                        required
                        />
                        <InputTextarea 
                        divClassName={'mb-3'}
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
                                    divClassName={'mb-3'}
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
                                    <button type="button" className="btn btn-primary substraction" onClick={removeInputIngredient}> - </button>
                                    <button type="button" className="btn btn-primary add" onClick={addInputIngredient}> + </button>
                                </div>
                            </div>

                            <div className="instructions">
                                <h3 className="mb-4">~ Instructions</h3>
                                <ol>
                                    {formState.instructions.map((instruc, index) => (
                                    <li key={index} className="mb-3">
                                    {instruc.img === null ? null : (
                                        <img src={ typeof instruc.img == "string" ? `http://localhost:3000/${instruc.img}` : instruc.img} alt="preview image" />
                                    )}
                                    <div className="input-group">
                                        <label className="input-group-text" htmlFor="inputGroupFile02">Image</label>
                                        <input className="form-control" id="inputGroupFile02" type="file" name="instructions[]" onChange={(e) => onHandleChange(e, index, 'img')}/>
                                    </div>
                                    <InputTextarea 
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
                                    <button type="button" className="btn btn-primary subtraction" onClick={removeInputInstruction}> - </button>
                                    <button type="button" className="btn btn-primary add" onClick={addInputInstruction}> + </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="form-btn mt-3">
                        <button type="submit" className="btn btn-primary w-100">Add Recipe</button>
                    </div>
                </form>
            </div>
            <SecondFooter /> 
        </>
    )
}

export default Edit;