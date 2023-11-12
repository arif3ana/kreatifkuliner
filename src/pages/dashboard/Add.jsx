import React, { useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import SecondFooter from "../../components/secondFooter";
import Input from "../../components/atom/input";
import InputTextarea from "../../components/atom/inputTextarea";
import Loader from '../../components/atom/loader';
import Swal from "sweetalert2";
import '../../scss/page/add&edit.scss';

const Add = () => {
    const [imagePreview, setImagePreview] = useState(null);
    const [message, setMessage] = useState('');
    const [errorMsg, setErrorMsg] = useState();
    const [isLoading, setIsLoading] = useState(false);
    // state untuk menghandle form
    const [formState, setFormState] = useState({
        name: '',
        description: '',
        image: null, // Gunakan ini untuk menyimpan file image
        ingredients: [''], // Data awalnya satu elemen kosong
        instructions: [{ img: null, step: '' }] // Data awalnya satu objek dengan img null dan step kosong
    });

    const initialStateClear = {
        name: '',
        description: '',
        image: null,
        ingredients: [''],
        instructions: [{ img: null, step: '' }]
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

    const handleImage = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        setFormState({...formState, image: file})
        const reader = new FileReader();

        reader.onloadend = () => {
            const imageData = reader.result;
            setImagePreview(imageData)
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
        if (list.length == 1) {
            return false
        }
        list.pop();
        setFormState({ ...formState, instructions: list });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
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
            const res = await axios.post(`${import.meta.env.VITE_APP_BASE_URL}/v1/user/food/add-food`, formData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            setMessage(res.data.message);
            setFormState(initialStateClear);
            setImagePreview(null);
            setIsLoading(false);
        } catch (error) {
            setErrorMsg(error.response.data.data);
            setIsLoading(false)
        }
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
                {isLoading && (<div className="loader-box"><Loader /></div>)}
                <form className="mt-3" onSubmit={handleSubmit}>
                    <div className="main-post">
                        <h2 className="mb-4">01 ~ Food Name & Description</h2>
                        {/* input main image */}
                        <div className="main-image mb-3">
                            <div className="input-group">
                                <label className="input-group-text" htmlFor="inputGroupFile01">Image</label>
                                <input className="form-control" id="inputGroupFile01" type="file" name="image" onChange={handleImage}/>
                            </div>
                            <div className="preview">
                                {imagePreview && (
                                    <img src={imagePreview} alt="preview image" />
                                )}
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
                        row={4}
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
                                    {formState.instructions.map((instruc, index) => (
                                    <li key={index} className="mb-3">
                                    <div className="input-group">
                                        <label className="input-group-text" htmlFor="inputGroupFile02">Image</label>
                                        <input className="form-control" id="inputGroupFile02" type="file" name="instructions[]" onChange={(e) => onHandleChange(e, index, 'img')}/>
                                    </div>
                                    <InputTextarea 
                                    divClassName={'intruct-desc'}
                                    name={'instructions[]'}
                                    placeholder={'Instructions'}
                                    row={2}
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

export default Add;