import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const setFoodData = createAsyncThunk(
    "landingPage/setFoodData",
    async (thunkAPI) => {
        return await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/foods/recipe`)
        .then((response) => {
            return response.data
        })
        .catch((error) => {
            console.log(error); 
        })
    }
)

const firstPageReducer = createSlice({
    name: "landingPage",
    initialState: {
        foodData: [],
        isLoading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(setFoodData.pending, (state) => {
            state.isLoading = true
        })

        builder.addCase(setFoodData.fulfilled, (state, action) => {
            state.isLoading = false
            state.foodData = action.payload.data
        })
        
        builder.addCase(setFoodData.rejected, (state, action) => {
          state.isLoading = false
          state.error = action.error.message
        })
    }
})

export default firstPageReducer;

