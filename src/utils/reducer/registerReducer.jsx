import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const userRegister = createAsyncThunk(
    'register/userRegister',
    async ({thunkAPI, data}) => {
        return await axios.post("http://localhost:3000/v1/auth/register",
        data,
        {
            headers: {'Content-Type': "application/json"}
        }).then((response) => {
            return response.data
        }).catch((error) => {
            return error.response.data;
        })
    }
)

const registerReducer = createSlice({
    name: "register",
    initialState: {
        userData: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(userRegister.fulfilled, (state, action) => {
            state.userData = action.payload.message;
        })
    }
})

export default registerReducer;