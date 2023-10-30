import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const userLogin = createAsyncThunk(
    "login/userLogin",
    async ({thunkAPI, reqData}) => {
        return await axios.post("http://localhost:3000/v1/auth/login",
        reqData,
        {
            headers: {"Content-Type": "application/json"}
        }).then((response) => {
            const dataRes = response.data;
            document.cookie = `accessToken=${dataRes.accessToken}; max-age=${60 * 60}; path=/dashboard; SameSite=Strict`;
            document.cookie = `refreshToken=${dataRes.refreshToken}; max-age=${86400}; path=/dashboard; SameSite=Strict`;
            
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