import { configureStore } from "@reduxjs/toolkit";
import firstPageReducer from "./reducer/firstPageReducer";
import registerReducer from "./reducer/registerReducer";
import loginReducer from "./reducer/loginReducer";
import homeReducer from "./reducer/homeReducer";


const store = configureStore({
    reducer: {
        food: firstPageReducer.reducer,
        register: registerReducer.reducer,
        login: loginReducer.reducer,
        home: homeReducer.reducer
    }
});

export default store;