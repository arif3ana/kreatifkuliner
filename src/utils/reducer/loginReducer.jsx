import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
export const userLogin = createAsyncThunk(
    "login/userLogin",
    async ({thunkAPI, reqData}) => {
        return await axios.post("http://localhost:3000/v1/auth/login",
        reqData,
        {
            withCredentials: true,
            headers: {"Content-Type": "application/json"}
        }).then((response) => {
            const dataRes = response.data;
            const access = response.headers.authorization;
            Cookies.set("accessToken", access, {path: '/', expires: new Date(Date.now() + 5 * 60 * 1000)});
            return dataRes;
        }).catch((error) => {
            return error.response.data;
        })
    }
)

const loginReducer = createSlice({
    name: "login",
    initialState:{
        loginData: [] // bersihkan state ketika sudah ada data dan ganti yang baru
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(userLogin.fulfilled, (state, action) => {
            state.loginData = action.payload
        })
    }
})

export default loginReducer;