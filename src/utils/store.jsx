import { configureStore } from "@reduxjs/toolkit";
import firstPageReducer from "./reducer/firstPageReducer";


const store = configureStore({
    reducer: {
        food: firstPageReducer.reducer
    }
});

export default store;