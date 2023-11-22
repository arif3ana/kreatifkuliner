import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const recipeContent = createAsyncThunk(
    'myrecipe/recipeContent',
    async ({userId, access}, {rejectWithValue}) => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/v1/user/food/author/${userId}`, {
                withCredentials: true,
                headers: {
                    'Authorization': access
                }
                });
            const data = await res.data;
            return data
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const recipeDelete = createAsyncThunk(
    'myrecipe/recipeDelete',
    async ({id, otentikasi}, {thunkAPI}) => {
        try {
            const res = await axios.delete(`${import.meta.env.VITE_APP_BASE_URL}/v1/user/food/delete/${id}`, {
                withCredentials: true,
                headers: {
                    'Authorization': otentikasi
                }
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
        error: null,
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
        builder.addCase(recipeContent.rejected, (state, action) => {
            state.error = action.payload.msg;
            state.isLoading = false;
        })


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