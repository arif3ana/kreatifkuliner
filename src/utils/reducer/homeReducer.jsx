import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const homeContent = createAsyncThunk(
    'home/homeContent',
    async(accessToken, {thunkAPI}) => {
        try {
            console.log(accessToken);
            const res = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/v1/user/food`, {
                withCredentials: true,
                headers: {
                    'Authorization': accessToken
                }
            });
            const data = await res.data;
            return data
        } catch (error) {
            return error.response            
        }
    }
)

const homeReducer = createSlice({
    name: "home",
    initialState: {
        homeData: [],
        isLoading: false
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(homeContent.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(homeContent.fulfilled, (state, action) => {
            state.homeData = action.payload.data
            state.isLoading = false
        })
    }
})

export default homeReducer;