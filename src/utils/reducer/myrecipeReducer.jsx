import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const recipeContent = createAsyncThunk(
    'myrecipe/recipeContent',
    async ({thunkAPI, user}) => {
        return await axios.get(`http://localhost:3000/v1/user/food/?user=${user}`, {
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
            const res = await axios.delete(`http://localhost:3000/v1/user/food/delete/${id}`, {
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
        myData: []
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(recipeContent.fulfilled, (state, action) => {
            state.myData = action.payload.data;
        });
        builder.addCase(recipeDelete.fulfilled, (state, action) => {
            const dataDeletedId = action.payload.data._id;
            const newState = state.myData.filter((data) => data._id !== dataDeletedId);
            state.myData = newState;
        })
    }
})

export default myrecipeReducer;