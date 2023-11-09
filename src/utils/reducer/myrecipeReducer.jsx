import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const recipeContent = createAsyncThunk(
    'myrecipe/recipeContent',
    async ({thunkAPI, user}) => {
        return await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/v1/user/food/?user=${user}`, {
            withCredentials: true
        }).then((response) => {
            return response.data
        }).catch((err) => {
            return err.response
        })
    }
)

export const recipeDelete = createAsyncThunk(
    'myrecipe/recipeDelete',
    async ({thunkAPI, id}) => {
        try {
            const res = await axios.delete(`${import.meta.env.VITE_APP_BASE_URL}/v1/user/food/delete/${id}`, {
                withCredentials: true
            });
            return res.data;
        } catch (error) {
            console.log(error);
        }
    }
)


const myrecipeReducer = createSlice({
    name: 'myrecipe',
    initialState:{
        myData: [],
        isLoading: false
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(recipeContent.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(recipeContent.fulfilled, (state, action) => {
            state.myData = action.payload.data;
            state.isLoading = false;
        });
        builder.addCase(recipeDelete.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(recipeDelete.fulfilled, (state, action) => {
            const dataDeletedId = action.payload.data._id;
            const newState = state.myData.filter((data) => data._id !== dataDeletedId);
            state.myData = newState;
            state.isLoading = false;
        });
        
    }
})

export default myrecipeReducer;