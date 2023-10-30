import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const homeContent = createAsyncThunk(
    'home/homeContent',
    async({thunkAPI, accessToken}) => {
        return await axios.get("http://localhost:3000/v1/user/food", {
            headers: {
                "Authorization": `Bearer ${accessToken}`,
            }
        }).then((response) => {
            return response.data;
        }).catch((error) => {
            return error.response.data;
        })
    }
)

const homeReducer = createSlice({
    name: "home",
    initialState: {
        homeData: []
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(homeContent.fulfilled, (state, action) => {
            state.homeData = action.payload
        })
    }
})

export default homeReducer;