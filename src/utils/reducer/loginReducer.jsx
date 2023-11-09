import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
export const userLogin = createAsyncThunk(
    "login/userLogin",
    async (reqData, {rejectWithValue}) => {
        try {
            const res =  await axios.post(`${import.meta.env.VITE_APP_BASE_URL}/v1/auth/login`,
            reqData, { withCredentials: true, headers: {"Content-Type": "application/json"}})
                const access = await res.headers.authorization;
                Cookies.set("accessToken", access, {path: '/', expires: new Date(Date.now() + 5 * 60 * 1000)});
                return res.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

const loginReducer = createSlice({
    name: "login",
    initialState:{
        loginData: [],
        isLoading: false,
        err: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(userLogin.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(userLogin.fulfilled, (state, action) => {
            state.loginData = action.payload;
            state.isLoading = false; 
        });
        builder.addCase(userLogin.rejected, (state, action) => {
            state.err = action.payload.msg;
            state.isLoading = false;
        });
    }
})

export default loginReducer;