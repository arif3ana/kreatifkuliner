import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const userRegister = createAsyncThunk(
    'register/userRegister',
    async (data, {rejectWithValue}) => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_APP_BASE_URL}/v1/auth/register`, data, {headers: {'Content-Type': "application/json"}});
            return res.data;
        } catch (error) {
            const errorMessage = error.response.data;
            if ('data' in errorMessage) {
                return rejectWithValue(errorMessage.data);
            } 
            if ('error' in errorMessage) {
                return rejectWithValue(errorMessage.error);
            } 
            
        }
    }
) 

const registerReducer = createSlice({
    name: "register",
    initialState: {
        userData: [],
        isLoading: false,
        err: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(userRegister.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(userRegister.fulfilled, (state, action) => {
            state.userData = action.payload.message;
            state.isLoading = false;
        });
        builder.addCase(userRegister.rejected, (state, action) => {
            state.err = action.payload;
            state.isLoading = false;
        });

    }
})

export default registerReducer;